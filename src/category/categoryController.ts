import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import CategoryService from "./categoryService";
import { Attribute, PriceConfiguration } from "./categoryTypes";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    async create(req: Request, res: Response, next: NextFunction) {
        interface CreateCategoryRequest {
            name: string;
            priceConfiguration: PriceConfiguration;
            attribute: Attribute;
        }
        const { name, priceConfiguration, attribute } =
            req.body as CreateCategoryRequest;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                const errorMessage: string = result.array()[0].msg as string;
                throw createHttpError(400, errorMessage);
            }
            const category = await this.categoryService.create(
                name,
                priceConfiguration,
                attribute,
            );

            res.json({
                message: "Category created successfully",
                data: category._id,
            });
        } catch (error) {
            next(error);
        }
    }
}
