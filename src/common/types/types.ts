import { Request } from "express";
import * as Jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    auth: Jwt.JwtPayload;
}

export interface AuthCookie {
    accessToken: string;
    refreshToken: string;
}
