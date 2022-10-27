import { Router, Request, Response } from "express";
// import asyncHandler from "express-async-handler";

const productRouter = Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.send("product route");
});
export default productRouter;
