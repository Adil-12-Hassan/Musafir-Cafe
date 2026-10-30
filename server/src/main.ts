import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { configureApp } from './configure-app.js';

async function bootstrap() {
  const app = await configureApp(await NestFactory.create(AppModule));

  await app.listen(process.env.PORT ?? 3001);
  console.log(`🚀 Musafir Cafe API running on http://localhost:3001`);
}
await bootstrap();
