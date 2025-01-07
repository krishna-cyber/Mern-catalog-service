import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import canAccess from "../common/middlewares/canAccess";
import { ProductController } from "./productController";
import ProductService from "./productService";
const productRouter = express.Router();
const productService = new ProductService();

const productController = new ProductController(productService);

// productRouter
//     .route("/:id")
//     .all(categoryIdValidator)
//     .get((req: Request, res: Response, next: NextFunction) =>
//         categoryController.getSingleCategory(req, res, next),
//     )
//     .patch((req: Request, res: Response, next: NextFunction) =>
//         categoryController.updateCategoryById(req, res, next),
//     )
//     .delete((req: Request, res: Response, next: NextFunction) =>
//         categoryController.deleteCategoryById(req, res, next),
//     );

productRouter
    .route("/")
    .get((req: Request, res: Response, next: NextFunction) =>
        productController.getProductLists(req, res, next),
    )
    .post(
        // authenticate,
        canAccess(["admin"]) as RequestHandler,
        // categoryValidator,
        (req: Request, res: Response, next: NextFunction) =>
            productController.create(req, res, next),
    );

export default productRouter;
