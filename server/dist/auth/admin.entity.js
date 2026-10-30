var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
let Admin = class Admin {
    id;
    username;
    passwordHash;
    refreshToken;
    createdAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Admin.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Admin.prototype, "username", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Admin.prototype, "passwordHash", void 0);
__decorate([
    Column('text', { nullable: true }),
    __metadata("design:type", Object)
], Admin.prototype, "refreshToken", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Admin.prototype, "createdAt", void 0);
Admin = __decorate([
    Entity('admins')
], Admin);
export { Admin };
//# sourceMappingURL=admin.entity.js.map