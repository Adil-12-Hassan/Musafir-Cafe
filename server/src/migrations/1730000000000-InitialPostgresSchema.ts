import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialPostgresSchema1730000000000 implements MigrationInterface {
  name = 'InitialPostgresSchema1730000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "menu_items" (
        "id" SERIAL PRIMARY KEY,
        "name" character varying NOT NULL,
        "description" character varying,
        "category" character varying NOT NULL,
        "priceM" integer NOT NULL,
        "priceL" integer NOT NULL,
        "ingredients" text,
        "available" boolean NOT NULL DEFAULT true,
        "imageUrl" character varying,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query(`
      INSERT INTO "menu_items"
        ("name", "description", "category", "priceM", "priceL", "ingredients")
      VALUES
        ('Spanish Sip', 'Rich, creamy & smooth - just your type.', 'iced_coffee', 370, 450, 'Coffee,Cold Milk,Sweetened Condensed Milk,Ice'),
        ('Honey Latte', 'Smooth coffee with a touch of golden honey.', 'iced_coffee', 370, 450, 'Coffee,Milk,Honey,Ice'),
        ('Caramel Cloud', 'Sweet, creamy & pure happiness.', 'iced_coffee', 350, 430, 'Coffee,Cold Milk,Caramel Syrup,Ice'),
        ('Hazel Hit', 'Nutty, smooth & totally addictive.', 'iced_coffee', 350, 430, 'Coffee,Cold Milk,Hazelnut Syrup,Ice'),
        ('Vanilla Vibe', 'Soft, sweet & simply timeless.', 'iced_coffee', 350, 430, 'Coffee,Cold Milk,Vanilla Syrup,Ice'),
        ('Classic Americano', 'Clean, crisp & perfectly refreshing.', 'iced_coffee', 320, 380, 'Coffee,Cold Water,Ice')
    `);
    await queryRunner.query(`
      CREATE TABLE "orders" (
        "id" SERIAL PRIMARY KEY,
        "orderId" character varying NOT NULL,
        "customerName" character varying NOT NULL,
        "customerPhone" character varying NOT NULL,
        "items" text NOT NULL,
        "total" integer NOT NULL,
        "status" character varying NOT NULL DEFAULT 'received',
        "notes" character varying,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_orders_orderId" UNIQUE ("orderId")
      )
    `);
    await queryRunner.query(`
      CREATE INDEX "IDX_orders_status_createdAt"
      ON "orders" ("status", "createdAt" DESC)
    `);
    await queryRunner.query(`
      CREATE TABLE "admins" (
        "id" SERIAL PRIMARY KEY,
        "username" character varying NOT NULL,
        "passwordHash" character varying NOT NULL,
        "refreshToken" text,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_admins_username" UNIQUE ("username")
      )
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "admins"');
    await queryRunner.query('DROP INDEX "IDX_orders_status_createdAt"');
    await queryRunner.query('DROP TABLE "orders"');
    await queryRunner.query('DROP TABLE "menu_items"');
  }
}
