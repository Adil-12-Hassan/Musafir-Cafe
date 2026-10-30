import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
export async function configureApp(app) {
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.setGlobalPrefix('api');
    return app;
}
//# sourceMappingURL=configure-app.js.map