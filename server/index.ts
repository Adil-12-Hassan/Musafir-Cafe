import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module.js';
import { configureApp } from './src/configure-app.js';

const app = await configureApp(await NestFactory.create(AppModule));
await app.init();

export default app.getHttpAdapter().getInstance();
