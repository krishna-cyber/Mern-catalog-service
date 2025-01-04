import express from "express";
import { CategoryController } from "./categoryController";
const categoryRouter = express.Router();

const categoryController = new CategoryController();

categoryRouter.post("/", (req, res) => categoryController.create(req, res));
