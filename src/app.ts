import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/categoryRouter";
import productRouter from "./product/productRouter";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload()); // with default configuration

app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.use(globalErrorHandler);

export default app;
