import { Router, Request, Response } from "express";
import { authMiddleware, isAdmin } from "../middlewares";
import asyncHandler from "express-async-handler";
import {
  getUserOrdersHandler,
  createOrderHandler,
  deleteOrderHandler,
  getAllrOrdersHandler,
  updateOrderStatusHandler,
  addToOrderHandler,
} from "../handlers/orderHandler";

const orderRouter = Router();

orderRouter.use(authMiddleware);
// protected (user)
orderRouter.get("/", asyncHandler(getUserOrdersHandler));

orderRouter.post("/", asyncHandler(createOrderHandler));

orderRouter.post("/addtoorder", asyncHandler(addToOrderHandler));

orderRouter.delete("/:id", asyncHandler(deleteOrderHandler));

orderRouter.use(isAdmin);

// protected (admin)
orderRouter.get("/all", asyncHandler(getAllrOrdersHandler));

orderRouter.put("/:id", asyncHandler(updateOrderStatusHandler));

export default orderRouter;
