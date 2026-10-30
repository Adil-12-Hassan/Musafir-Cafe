import { MenuService } from './menu.service.js';
export declare class MenuController {
    private menuService;
    constructor(menuService: MenuService);
    findAll(category?: string): Promise<import("./menu.entity.js").MenuItem[]>;
    findOne(id: string): Promise<import("./menu.entity.js").MenuItem | null>;
    create(body: any): Promise<import("./menu.entity.js").MenuItem>;
    update(id: string, body: any): Promise<import("./menu.entity.js").MenuItem | null>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
