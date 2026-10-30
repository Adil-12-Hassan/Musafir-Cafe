var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Admin } from './admin.entity.js';
import { getAuthSecret } from './auth-secrets.js';
let AuthService = class AuthService {
    adminRepo;
    jwtService;
    constructor(adminRepo, jwtService) {
        this.adminRepo = adminRepo;
        this.jwtService = jwtService;
    }
    async onModuleInit() {
        const count = await this.adminRepo.count();
        if (count === 0) {
            const username = process.env.ADMIN_USERNAME;
            const password = process.env.ADMIN_PASSWORD;
            if (!username || !password) {
                throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD must be set to create the initial admin account.');
            }
            const hash = await bcrypt.hash(password, 12);
            const result = await this.adminRepo
                .createQueryBuilder()
                .insert()
                .values({ username, passwordHash: hash })
                .orIgnore()
                .execute();
            if (result.identifiers.length > 0) {
                console.log('Admin created.');
            }
        }
    }
    async validateAdmin(username, password) {
        const admin = await this.adminRepo.findOne({ where: { username } });
        if (!admin)
            return null;
        const valid = await bcrypt.compare(password, admin.passwordHash);
        return valid ? admin : null;
    }
    generateAccessToken(admin) {
        return this.jwtService.sign({ sub: admin.id, username: admin.username });
    }
    generateRefreshToken(admin) {
        return this.jwtService.sign({ sub: admin.id, username: admin.username, type: 'refresh' }, { secret: getAuthSecret('JWT_REFRESH_SECRET', 'musafir-refresh-secret'), expiresIn: '7d' });
    }
    async login(admin) {
        const accessToken = this.generateAccessToken(admin);
        const refreshToken = this.generateRefreshToken(admin);
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.adminRepo.update(admin.id, { refreshToken: hashed });
        return { accessToken, refreshToken };
    }
    async refresh(refreshToken) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: getAuthSecret('JWT_REFRESH_SECRET', 'musafir-refresh-secret'),
            });
            const admin = await this.adminRepo.findOne({ where: { id: payload.sub } });
            if (!admin || !admin.refreshToken)
                throw new UnauthorizedException();
            const valid = await bcrypt.compare(refreshToken, admin.refreshToken);
            if (!valid)
                throw new UnauthorizedException();
            const accessToken = this.generateAccessToken(admin);
            return { accessToken };
        }
        catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(adminId) {
        await this.adminRepo.update(adminId, { refreshToken: null });
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Admin)),
    __metadata("design:paramtypes", [Repository,
        JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map