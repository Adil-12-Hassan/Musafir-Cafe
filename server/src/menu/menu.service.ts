import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu.entity.js';

@Injectable()
export class MenuService implements OnModuleInit {
  constructor(
    @InjectRepository(MenuItem)
    private menuRepo: Repository<MenuItem>,
  ) {}

  // Seed the menu with Musafir's real items on first run
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

  findByCategory(category: string) {
    return this.menuRepo.find({ where: { category, available: true } });
  }

  findOne(id: number) {
    return this.menuRepo.findOne({ where: { id } });
  }

  create(data: Partial<MenuItem>) {
    const item = this.menuRepo.create(data);
    return this.menuRepo.save(item);
  }

  async update(id: number, data: Partial<MenuItem>) {
    await this.menuRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.menuRepo.update(id, { available: false }); // soft delete
    return { message: 'Item removed from menu' };
  }
}
