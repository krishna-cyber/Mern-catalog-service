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
import { ImagekitStorage } from "../common/services/imageKit/imagekitStorage";
import productValidator from "./productValidator";
import upload from "../common/services/multer/multer";
import productParamValidator from "./productParamValidator";
import logger from "../config/logger";
// import Product from "./productModel";
const productRouter = express.Router();
const productService = new ProductService();
const imageKitClient = new ImagekitStorage(logger);

const productController = new ProductController(productService, imageKitClient);

productRouter
    .route("/")
    .get(
        productParamValidator,
        (req: Request, res: Response, next: NextFunction) =>
            productController.getProductLists(req, res, next),
    )
    .post(
        upload.array("images[]"),
        authenticate,
        canAccess([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
        productValidator,
        (req: Request, res: Response, next: NextFunction) =>
            productController.create(req, res, next),
    );

// productRouter
//     .route("/:productId")
//     .get(async (req: Request, res: Response, next: NextFunction) => {
//         const product = await Product.findOne({
//             _id: "679a4467b43a49dc01dcd9ef",
//         });
//         res.json({
//             product,
//         });
//     });

export default productRouter;
