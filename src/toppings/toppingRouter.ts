import express, {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import { ToppingController } from "./toppingController";
import { ToppingService } from "./toppingService";
import toppingValidator from "./toppingValidator";
import toppingQueryParamValidator from "./toppingQueryParamValidator";
import upload from "../common/services/multer/multer";
import authenticate from "../common/middlewares/authenticate";
import canAccess from "../common/middlewares/canAccess";
import { ROLES } from "../config/constants";
import { ImagekitStorage } from "../common/services/imageKit/imagekitStorage";
import logger from "../config/logger";

const imageUploadService = new ImagekitStorage(logger);
const toppingService = new ToppingService(imageUploadService);
const toppingController = new ToppingController(toppingService);

const toppingRouter = express.Router();

toppingRouter
    .route("/")
    .post(
        upload.single("image"),
        authenticate,
        canAccess([ROLES.ADMIN, ROLES.MANAGER]) as RequestHandler,
        toppingValidator,
        (req: Request, res: Response, next: NextFunction) =>
            toppingController.create(req, res, next),
    )
    .get(
        toppingQueryParamValidator,
        (req: Request, res: Response, next: NextFunction) =>
            toppingController.getLists(req, res, next),
    );

export default toppingRouter;
