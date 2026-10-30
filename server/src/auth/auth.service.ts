import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entity.js';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  // Seed the configured admin on startup if none exists
  async onModuleInit() {
    const count = await this.adminRepo.count();
    if (count === 0) {
      const username = process.env.ADMIN_USERNAME;
      const password = process.env.ADMIN_PASSWORD;
      if (!username || !password) {
        throw new Error(
          'ADMIN_USERNAME and ADMIN_PASSWORD must be set to create the initial admin account.',
        );
      }

      const hash = await bcrypt.hash(password, 12);
      await this.adminRepo.save({ username, passwordHash: hash });
      console.log('Admin created.');
    }
  }

  async validateAdmin(username: string, password: string): Promise<Admin | null> {
    const admin = await this.adminRepo.findOne({ where: { username } });
    if (!admin) return null;
    const valid = await bcrypt.compare(password, admin.passwordHash);
    return valid ? admin : null;
  }

  generateAccessToken(admin: Admin) {
    return this.jwtService.sign({ sub: admin.id, username: admin.username });
  }

  generateRefreshToken(admin: Admin) {
    return this.jwtService.sign(
      { sub: admin.id, username: admin.username, type: 'refresh' },
      { secret: process.env.JWT_REFRESH_SECRET || 'musafir-refresh-secret', expiresIn: '7d' },
    );
  }

  async login(admin: Admin) {
    const accessToken = this.generateAccessToken(admin);
    const refreshToken = this.generateRefreshToken(admin);

    // Store hashed refresh token
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.adminRepo.update(admin.id, { refreshToken: hashed });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET || 'musafir-refresh-secret',
      });
      const admin = await this.adminRepo.findOne({ where: { id: payload.sub } });
      if (!admin || !admin.refreshToken) throw new UnauthorizedException();

      const valid = await bcrypt.compare(refreshToken, admin.refreshToken);
      if (!valid) throw new UnauthorizedException();

      const accessToken = this.generateAccessToken(admin);
      return { accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(adminId: number) {
    await this.adminRepo.update(adminId, { refreshToken: null });
  }
}
