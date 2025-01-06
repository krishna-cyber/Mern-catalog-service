import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import CategoryService from "./categoryService";
import { CreateCategoryRequest } from "./categoryTypes";

export class CategoryController {
    constructor(private categoryService: CategoryService) {}
    async create(req: Request, res: Response, next: NextFunction) {
        const { name, priceConfiguration, attributes } =
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
                attributes,
            );

            res.json({
                message: "Category created successfully",
                data: category._id,
            });
        } catch (error) {
            next(error);
        }
    }
    async getCategoryLists(req: Request, res: Response, next: NextFunction) {
        try {
            //todo
            res.json({
                msg: "All list fetched",
            });
        } catch (error) {
            next(error);
        }
    }

    async getSingleCategory(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        //todo
        try {
            res.json({ msg: id });
        } catch (error) {
            next(error);
        }
    }
}
