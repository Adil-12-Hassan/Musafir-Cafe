import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MenuItem } from './menu.entity.js';
export declare class MenuService implements OnModuleInit {
    private menuRepo;
    constructor(menuRepo: Repository<MenuItem>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<MenuItem[]>;
    findByCategory(category: string): Promise<MenuItem[]>;
    findOne(id: number): Promise<MenuItem | null>;
    create(data: Partial<MenuItem>): Promise<MenuItem>;
    update(id: number, data: Partial<MenuItem>): Promise<MenuItem | null>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
