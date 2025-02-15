import express from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/categoryRouter";
import productRouter from "./product/productRouter";
import morgan from "morgan";
import toppingRouter from "./toppings/toppingRouter";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/topping", toppingRouter);

app.use(globalErrorHandler);

export default app;
