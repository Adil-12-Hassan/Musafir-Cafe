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
import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { MenuService } from './menu.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
let MenuController = class MenuController {
    menuService;
    constructor(menuService) {
        this.menuService = menuService;
    }
    findAll(category) {
        if (category)
            return this.menuService.findByCategory(category);
        return this.menuService.findAll();
    }
    findOne(id) {
        return this.menuService.findOne(+id);
    }
    create(body) {
        return this.menuService.create(body);
    }
    update(id, body) {
        return this.menuService.update(+id, body);
    }
    remove(id) {
        return this.menuService.remove(+id);
    }
};
__decorate([
    Get(),
    __param(0, Query('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "findOne", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "create", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "update", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "remove", null);
MenuController = __decorate([
    Controller('menu'),
    __metadata("design:paramtypes", [MenuService])
], MenuController);
export { MenuController };
//# sourceMappingURL=menu.controller.js.map