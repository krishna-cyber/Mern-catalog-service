import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { CategoryController } from "./categoryController";
import categoryValidator from "./categoryValidator";
import CategoryService from "./categoryService";
import authenticate from "../common/middlewares/authenticate";
import canAccess from "../common/middlewares/canAccess";
const categoryRouter = express.Router();

const categoryService = new CategoryService();

const categoryController = new CategoryController(categoryService);

categoryRouter.post(
    "/",
    authenticate,
    canAccess(["admin"]) as RequestHandler,
    categoryValidator,
    (req: Request, res: Response, next: NextFunction) =>
        categoryController.create(req, res, next),
);

export default categoryRouter;
