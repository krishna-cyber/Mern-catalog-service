import { NextFunction, Request, Response } from "express";
import productService from "./productService";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { productDetails } from "./productTypes";

export class ProductController {
    constructor(private productService: productService) {}
    async create(req: Request, res: Response, next: NextFunction) {
        const validationPassed = validationResult(req);

        const {
            name,
            description,
            image,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
        } = req.body as productDetails;

        try {
            if (!validationPassed.isEmpty()) {
                throw createHttpError(
                    400,
                    validationPassed.array()[0].msg as string,
                );
            }

            await this.productService.create(
                name,
                description,
                image,
                priceConfiguration,
                attributes,
                tenantId,
                categoryId,
                isPublish,
            );

            res.json({
                result: null,
                message: "Product Created successfully",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }
    async getProductLists(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await this.productService.listCategories();
            res.json({
                result: products,
                message: "Products list fetched",
                meta: null,
            });
        } catch (error) {
            next(error);
        }
    }

    // async getSingleCategory(req: Request, res: Response, next: NextFunction) {
    //     const validation = validationResult(req);
    //     const { id } = req.params;
    //     try {
    //         if (!validation.isEmpty()) {
    //             throw createHttpError(422, validation.array()[0].msg as string);
    //         }
    //         const categoryDetails = await this.productService.getById(id);
    //         res.json({
    //             result: categoryDetails,
    //             message: "Category Detail",
    //             meta: null,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async updateCategoryById(req: Request, res: Response, next: NextFunction) {
    //     const validation = validationResult(req);
    //     const { id } = req.params;
    //     const updateValue = req.body as Category;
    //     try {
    //         if (!validation.isEmpty()) {
    //             throw createHttpError(422, validation.array()[0].msg as string);
    //         }

    //         await this.productService.updateById(id, updateValue);

    //         res.json({
    //             result: null,
    //             message: "Updated Successfully",
    //             meta: null,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }

    // async deleteCategoryById(req: Request, res: Response, next: NextFunction) {
    //     const validation = validationResult(req);
    //     const { id } = req.params;
    //     try {
    //         if (!validation.isEmpty()) {
    //             throw createHttpError(422, validation.array()[0].msg as string);
    //         }

    //         await this.productService.deleteById(id);

    //         res.json({
    //             result: null,
    //             message: "Category deleted",
    //             meta: null,
    //         });
    //     } catch (error) {
    //         next(error);
    //     }
    // }
}
