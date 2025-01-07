import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import CategoryService from "./categoryService";
import { Category, CreateCategoryRequest } from "./categoryTypes";

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
            const categories = await this.categoryService.listCategories();
            res.json({
                result: categories,
                message: "Categories list fetched",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    async getSingleCategory(req: Request, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        const { id } = req.params;
        try {
            if (!validation.isEmpty()) {
                throw createHttpError(422, validation.array()[0].msg as string);
            }
            const categoryDetails = await this.categoryService.getById(id);
            res.json({
                result: categoryDetails,
                message: "Category Detail",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    async updateCategoryById(req: Request, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        const { id } = req.params;
        const updateValue = req.body as Category;
        try {
            if (!validation.isEmpty()) {
                throw createHttpError(422, validation.array()[0].msg as string);
            }

            await this.categoryService.updateById(id, updateValue);

            res.json({
                result: null,
                message: "Updated Successfully",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCategoryById(req: Request, res: Response, next: NextFunction) {
        const validation = validationResult(req);
        const { id } = req.params;
        try {
            if (!validation.isEmpty()) {
                throw createHttpError(422, validation.array()[0].msg as string);
            }

            await this.categoryService.deleteById(id);

            res.json({
                result: null,
                message: "Category deleted",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }
}
