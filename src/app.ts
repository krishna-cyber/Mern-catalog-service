import express from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";
import categoryRouter from "./category/categoryRouter";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/category", categoryRouter);

app.use(globalErrorHandler);

export default app;
