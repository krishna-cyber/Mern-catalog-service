import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./categoryController";
import categoryValidator from "./categoryValidator";
import CategoryService from "./categoryService";
const categoryRouter = express.Router();

const categoryService = new CategoryService();

const categoryController = new CategoryController(categoryService);

categoryRouter.post(
    "/",
    categoryValidator,
    (req: Request, res: Response, next: NextFunction) =>
        categoryController.create(req, res, next),
);

export default categoryRouter;
