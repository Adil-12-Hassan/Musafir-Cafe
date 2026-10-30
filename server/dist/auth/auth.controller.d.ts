import type { Response, Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service.js';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: ExpressRequest & {
        user: any;
    }, res: Response): Promise<{
        accessToken: string;
    }>;
    refresh(req: ExpressRequest & {
        cookies: any;
    }): Promise<{
        accessToken: string;
    } | {
        error: string;
    }>;
    logout(req: ExpressRequest & {
        user: any;
    }, res: Response): Promise<{
        message: string;
    }>;
}
