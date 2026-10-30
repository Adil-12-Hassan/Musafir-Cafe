import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 3001);
    console.log(`🚀 Musafir Cafe API running on http://localhost:3001`);
}
await bootstrap();
//# sourceMappingURL=main.js.map