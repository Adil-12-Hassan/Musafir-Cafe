import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './admin.entity.js';
export declare class AuthService implements OnModuleInit {
    private adminRepo;
    private jwtService;
    constructor(adminRepo: Repository<Admin>, jwtService: JwtService);
    onModuleInit(): Promise<void>;
    validateAdmin(username: string, password: string): Promise<Admin | null>;
    generateAccessToken(admin: Admin): string;
    generateRefreshToken(admin: Admin): string;
    login(admin: Admin): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    logout(adminId: number): Promise<void>;
}
