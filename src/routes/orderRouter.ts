import { Router, Request, Response } from "express";
// import asyncHandler from "express-async-handler";

const orderRouter = Router();

// protected (user)
orderRouter.get("/", (req: Request, res: Response) => {
  res.send("all orders of user");
});

// protected (user)
orderRouter.post("/", (req: Request, res: Response) => {
  res.send("create order");
});

// protected (user)
orderRouter.delete("/:id", (req: Request, res: Response) => {
  res.send(" delete  order");
});

// protected (admin)
orderRouter.put("/:id", (req: Request, res: Response) => {
  res.send("edit status route");
});

export default orderRouter;
