import { NextFunction, Request, Response } from "express";
import { ToppingService } from "./toppingService";

export class ToppingController {
    constructor(private readonly toppingService: ToppingService) {}

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            await this.toppingService.create();
        } catch (error) {
            next(error);
        }
    }

    async getLists(req: Request, res: Response, next: NextFunction) {
        try {
            await this.toppingService.lists();

            res.json({
                message: "Toppings list fetched",
            });
        } catch (error) {
            next(error);
        }
    }
}
