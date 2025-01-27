import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import canAccess from "../common/middlewares/canAccess";
import { ProductController } from "./productController";
import ProductService from "./productService";
import authenticate from "../common/middlewares/authenticate";
import { ROLES } from "../config/constants";
import { imagekitStorage } from "../common/services/imageKit/imagekitStorage";
import productValidator from "./productValidator";
const productRouter = express.Router();
const productService = new ProductService();
const imageKitClient = new imagekitStorage();

const productController = new ProductController(productService, imageKitClient);

productRouter
    .route("/")
    .get((req: Request, res: Response, next: NextFunction) =>
        productController.getProductLists(req, res, next),
    )
    .post(
        authenticate,
        canAccess([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
        productValidator,
        (req: Request, res: Response, next: NextFunction) =>
            productController.create(req, res, next),
    );

export default productRouter;
