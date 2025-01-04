import express from "express";
import { CategoryController } from "./categoryController";
import categoryValidator from "./categoryValidator";
const categoryRouter = express.Router();

const categoryController = new CategoryController();

categoryRouter.post("/", categoryValidator, categoryController.create);

export default categoryRouter;
