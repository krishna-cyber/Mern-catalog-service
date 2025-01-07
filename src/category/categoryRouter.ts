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
import categoryIdValidator from "./categoryIdValidator";
import { ROLES } from "../config/constants";
const categoryRouter = express.Router();

const categoryService = new CategoryService();

const categoryController = new CategoryController(categoryService);

categoryRouter
    .route("/:id")
    .all(categoryIdValidator)
    .get((req: Request, res: Response, next: NextFunction) =>
        categoryController.getSingleCategory(req, res, next),
    )
    .patch((req: Request, res: Response, next: NextFunction) =>
        categoryController.updateCategoryById(req, res, next),
    )
    .delete((req: Request, res: Response, next: NextFunction) =>
        categoryController.deleteCategoryById(req, res, next),
    );

categoryRouter
    .route("/")

    .get((req: Request, res: Response, next: NextFunction) =>
        categoryController.getCategoryLists(req, res, next),
    )
    .post(
        authenticate,
        canAccess([ROLES.ADMIN]) as RequestHandler,
        categoryValidator,
        (req: Request, res: Response, next: NextFunction) =>
            categoryController.create(req, res, next),
    );

export default categoryRouter;
