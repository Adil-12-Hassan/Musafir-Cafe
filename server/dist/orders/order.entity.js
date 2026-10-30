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
export var OrderStatus;
(function (OrderStatus) {
    OrderStatus["RECEIVED"] = "received";
    OrderStatus["PREPARING"] = "preparing";
    OrderStatus["READY"] = "ready";
    OrderStatus["DONE"] = "done";
})(OrderStatus || (OrderStatus = {}));
let Order = class Order {
    id;
    orderId;
    customerName;
    customerPhone;
    items;
    total;
    status;
    notes;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Order.prototype, "orderId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customerName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Order.prototype, "customerPhone", void 0);
__decorate([
    Column('simple-json'),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    Column('int'),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    Column({ default: OrderStatus.RECEIVED }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "notes", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
Order = __decorate([
    Entity('orders')
], Order);
export { Order };
//# sourceMappingURL=order.entity.js.map