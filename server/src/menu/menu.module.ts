import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from './menu.controller.js';
import { MenuService } from './menu.service.js';
import { MenuItem } from './menu.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem])],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
