import { Router, Request, Response } from "express";
// import asyncHandler from "express-async-handler";

const productRouter = Router();

productRouter.get("/", (req: Request, res: Response) => {
  res.send("index product");
});

productRouter.get("/:id", (req: Request, res: Response) => {
  res.send("show one product");
});

// protected
productRouter.post("/", (req: Request, res: Response) => {
  res.send("create product");
});
export default productRouter;
