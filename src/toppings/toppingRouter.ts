import express, { NextFunction, Request, Response } from "express";
import { ToppingController } from "./toppingController";
import { ToppingService } from "./toppingService";
import toppingValidator from "./toppingValidator";
const toppingService = new ToppingService();

const toppingController = new ToppingController(toppingService);

const toppingRouter = express.Router();

toppingRouter
    .route("/")
    .post(toppingValidator, (req: Request, res: Response, next: NextFunction) =>
        toppingController.create(req, res, next),
    )
    .get((req: Request, res: Response, next: NextFunction) =>
        toppingController.getLists(req, res, next),
    );

export default toppingRouter;
