import { NextFunction, Request, Response } from "express";
import productService from "./productService";
import { matchedData, validationResult } from "express-validator";
import createHttpError from "http-errors";
import { ProductAttribute, ProductBodyRequest } from "./productTypes";
import { ImagekitStorage } from "../common/services/imageKit/imagekitStorage";
import { PriceConfiguration } from "../category/categoryTypes";

export class ProductController {
    constructor(
        private readonly productService: productService,
        private readonly uploadClient: ImagekitStorage,
    ) {}
    async create(req: Request, res: Response, next: NextFunction) {
        const validationPassed = validationResult(req);
        let images: string[] = [];
        const {
            name,
            description,
            priceConfiguration,
            attributes,
            tenantId,
            categoryId,
            isPublish,
        } = req.body as ProductBodyRequest;

        const files = req.files as
            | { [fieldname: string]: Express.Multer.File[] }
            | Express.Multer.File[];

        try {
            if (!validationPassed.isEmpty()) {
                throw createHttpError(
                    400,
                    validationPassed.array()[0].msg as string,
                );
            }

            if (files) {
                const imageToUpload = Array.isArray(files)
                    ? files
                    : files.images || [];
                const uploadedImages =
                    (await this.uploadClient.upload(imageToUpload)) || [];
                if (Array.isArray(uploadedImages)) {
                    images = uploadedImages.map(
                        (image: { url: string }) => image.url,
                    );
                }
            }

            const product = {
                name,
                description,
                image: images,
                priceConfiguration: JSON.parse(
                    priceConfiguration,
                ) as PriceConfiguration,
                attributes: JSON.parse(attributes) as [ProductAttribute],
                tenantId,
                categoryId,
                isPublish,
            };
            await this.productService.create(product);

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
        const queryParams = matchedData(req, { onlyValidData: true }) as {
            currentPage: number;
            pageSize: number;
            tenantId: string | null;
            categoryId: string | null;
            search: string;
            isPublish: boolean;
        };

        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const { data, totalCounts } =
                await this.productService.getProductLists(
                    queryParams.currentPage || 1,
                    queryParams.pageSize || 10,
                    queryParams.categoryId,
                    queryParams.tenantId,
                    queryParams.search,
                    queryParams.isPublish,
                );

            res.status(200).json({
                result: data as string[],
                message: "Products fetched successfully",
                meta: {
                    currentPage: queryParams.currentPage,
                    pageSize: queryParams.pageSize,
                    totalDocuments: totalCounts as number,
                },
            });
        } catch (error) {
            const err = createHttpError(500, `Error fetching product lists`);

            next(err);
            return;
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
