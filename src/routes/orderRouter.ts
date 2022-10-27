import { Router, Request, Response } from "express";
// import asyncHandler from "express-async-handler";

const orderRouter = Router();

orderRouter.get("/", (req: Request, res: Response) => {
  res.send("order route");
});
export default orderRouter;
