import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MenuService } from './menu.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  // Public
  @Get()
  findAll(@Query('category') category?: string) {
    if (category) return this.menuService.findByCategory(category);
    return this.menuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  // Admin only
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.menuService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.menuService.update(+id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
