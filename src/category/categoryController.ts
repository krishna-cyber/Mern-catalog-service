import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";

export class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                const errors = result.array().map((error) => {
                    return {
                        msg: error.msg as string,
                        type: error.type,
                    };
                });
                next(createHttpError(400, errors));
            }
        } catch (error) {
            next(error);
        }
    }
}
