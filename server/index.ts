import { NestFactory } from '@nestjs/core';
import { AppModule } from './dist/app.module.js';
import { configureApp } from './dist/configure-app.js';

const app = await configureApp(await NestFactory.create(AppModule));
await app.init();

export default app.getHttpAdapter().getInstance();
