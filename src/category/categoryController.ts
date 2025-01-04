import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            res.json({ result });
        } catch (error) {
            next(error);
        }
    }
}
