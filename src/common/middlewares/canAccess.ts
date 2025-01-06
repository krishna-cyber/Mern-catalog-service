import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/types";
import createHttpError from "http-errors";

export default function canAccess(roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const { role } = req.auth;

            if (!roles.includes(role as string)) {
                const err = createHttpError(403, "Forbidden");
                next(err);
            }
            next();
        } catch (error) {
            next(error);
            return;
        }
    };
}
