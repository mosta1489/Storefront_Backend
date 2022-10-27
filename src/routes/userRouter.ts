import { Router, Request, Response } from "express";
// import asyncHandler from "express-async-handler";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("user route");
});
export default userRouter;
