var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
export var DrinkSize;
(function (DrinkSize) {
    DrinkSize["MEDIUM"] = "medium";
    DrinkSize["LARGE"] = "large";
})(DrinkSize || (DrinkSize = {}));
export var DrinkCategory;
(function (DrinkCategory) {
    DrinkCategory["ICED_COFFEE"] = "iced_coffee";
    DrinkCategory["HOT_COFFEE"] = "hot_coffee";
    DrinkCategory["SPECIAL"] = "special";
})(DrinkCategory || (DrinkCategory = {}));
let MenuItem = class MenuItem {
    id;
    name;
    description;
    category;
    priceM;
    priceL;
    ingredients;
    available;
    imageUrl;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], MenuItem.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuItem.prototype, "name", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "description", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], MenuItem.prototype, "category", void 0);
__decorate([
    Column('int'),
    __metadata("design:type", Number)
], MenuItem.prototype, "priceM", void 0);
__decorate([
    Column('int'),
    __metadata("design:type", Number)
], MenuItem.prototype, "priceL", void 0);
__decorate([
    Column('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], MenuItem.prototype, "ingredients", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], MenuItem.prototype, "available", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], MenuItem.prototype, "imageUrl", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], MenuItem.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], MenuItem.prototype, "updatedAt", void 0);
MenuItem = __decorate([
    Entity('menu_items')
], MenuItem);
export { MenuItem };
//# sourceMappingURL=menu.entity.js.map