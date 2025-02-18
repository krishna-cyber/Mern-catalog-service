import { NextFunction, Request, Response } from "express";
import { ToppingService } from "./toppingService";
import { matchedData, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { ToppingBodyRequest } from "./toppingTypes";

export class ToppingController {
    constructor(private readonly toppingService: ToppingService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        const validationPassed = validationResult(req);
        const {
            name,

            tenantId,
            price,
        } = req.body as ToppingBodyRequest;

        const file = req.file as Express.Multer.File;
        try {
            if (!validationPassed.isEmpty()) {
                throw createHttpError(
                    400,
                    validationPassed.array()[0].msg as string,
                );
            }
            const { _id } = await this.toppingService.create({
                file,
                name,
                tenantId,
                price,
            });
            res.json({
                message: "Topping created successfully",
                _id,
            });
        } catch (error) {
            next(error);
        }
    }

    async getLists(req: Request, res: Response, next: NextFunction) {
        const queryParams = matchedData(req, { onlyValidData: true }) as {
            tenantId: string;
        };
        try {
            const result = await this.toppingService.lists(
                queryParams.tenantId,
            );

            res.json({
                message: "Toppings list fetched",
                result,
            });
        } catch (error) {
            next(error);
        }
    }
}
