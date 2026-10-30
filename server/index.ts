import { NestFactory } from '@nestjs/core';
import type { Request, Response } from 'express';
import { AppModule } from './dist/app.module.js';
import { configureApp } from './dist/configure-app.js';

type ExpressHandler = (request: Request, response: Response) => void;

let handlerPromise: Promise<ExpressHandler> | undefined;

async function createHandler(): Promise<ExpressHandler> {
  const app = await configureApp(await NestFactory.create(AppModule));
  await app.init();
  return app.getHttpAdapter().getInstance() as ExpressHandler;
}

export default async function handler(request: Request, response: Response): Promise<void> {
  handlerPromise ??= createHandler();
  const expressHandler = await handlerPromise;
  expressHandler(request, response);
}
