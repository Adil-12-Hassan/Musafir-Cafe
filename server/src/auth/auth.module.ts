import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './jwt.strategy.js';
import { LocalStrategy } from './local.strategy.js';
import { Admin } from './admin.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'musafir-super-secret-change-in-prod',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
