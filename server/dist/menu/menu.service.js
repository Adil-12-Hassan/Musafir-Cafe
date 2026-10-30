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
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu.entity.js';
let MenuService = class MenuService {
    menuRepo;
    constructor(menuRepo) {
        this.menuRepo = menuRepo;
    }
    async onModuleInit() {
        const count = await this.menuRepo.count();
        if (count === 0) {
            const items = [
                { name: 'Spanish Sip', description: 'Rich, creamy & smooth — just your type.', category: 'iced_coffee', priceM: 370, priceL: 450, ingredients: ['Coffee', 'Cold Milk', 'Sweetened Condensed Milk', 'Ice'] },
                { name: 'Honey Latte', description: 'Smooth coffee with a touch of golden honey.', category: 'iced_coffee', priceM: 370, priceL: 450, ingredients: ['Coffee', 'Milk', 'Honey', 'Ice'] },
                { name: 'Caramel Cloud', description: 'Sweet, creamy & pure happiness.', category: 'iced_coffee', priceM: 350, priceL: 430, ingredients: ['Coffee', 'Cold Milk', 'Caramel Syrup', 'Ice'] },
                { name: 'Hazel Hit', description: 'Nutty, smooth & totally addictive.', category: 'iced_coffee', priceM: 350, priceL: 430, ingredients: ['Coffee', 'Cold Milk', 'Hazelnut Syrup', 'Ice'] },
                { name: 'Vanilla Vibe', description: 'Soft, sweet & simply timeless.', category: 'iced_coffee', priceM: 350, priceL: 430, ingredients: ['Coffee', 'Cold Milk', 'Vanilla Syrup', 'Ice'] },
                { name: 'Classic Americano', description: 'Clean, crisp & perfectly refreshing.', category: 'iced_coffee', priceM: 320, priceL: 380, ingredients: ['Coffee', 'Cold Water', 'Ice'] },
            ];
            await this.menuRepo.save(items);
            console.log('✅ Menu seeded with Musafir items');
        }
    }
    findAll() {
        return this.menuRepo.find({ where: { available: true } });
    }
    findByCategory(category) {
        return this.menuRepo.find({ where: { category, available: true } });
    }
    findOne(id) {
        return this.menuRepo.findOne({ where: { id } });
    }
    create(data) {
        const item = this.menuRepo.create(data);
        return this.menuRepo.save(item);
    }
    async update(id, data) {
        await this.menuRepo.update(id, data);
        return this.findOne(id);
    }
    async remove(id) {
        await this.menuRepo.update(id, { available: false });
        return { message: 'Item removed from menu' };
    }
};
MenuService = __decorate([
    Injectable(),
    __param(0, InjectRepository(MenuItem)),
    __metadata("design:paramtypes", [Repository])
], MenuService);
export { MenuService };
//# sourceMappingURL=menu.service.js.map