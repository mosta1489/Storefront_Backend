import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  getProductsHandler,
  showProductHandler,
  createProductHandler,
} from "../handlers/productHandler";
import { authMiddleware, isAdmin } from "../middlewares";
const productRouter = Router();

productRouter.get("/", asyncHandler(getProductsHandler));

productRouter.get("/:id", asyncHandler(showProductHandler));

productRouter.use(authMiddleware, isAdmin);
productRouter.post("/", asyncHandler(createProductHandler));
export default productRouter;
