import express, { NextFunction, Request, Response } from "express";
import { CategoryController } from "./categoryController";
import categoryValidator from "./categoryValidator";
const categoryRouter = express.Router();

const categoryController = new CategoryController();

categoryRouter.post(
    "/",
    categoryValidator,
    (req: Request, res: Response, next: NextFunction) =>
        categoryController.create(req, res, next),
);

export default categoryRouter;
