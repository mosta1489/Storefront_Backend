import { Router, Request, Response } from "express";
// import asyncHandler from "express-async-handler";

const userRouter = Router();

// portected (admin only)
userRouter.get("/", (req: Request, res: Response) => {
  res.send("show all users IDs");
});

// portected (admin only)
userRouter.get("/:id", (req: Request, res: Response) => {
  res.send("show user data");
});

userRouter.post("/signup", (req: Request, res: Response) => {
  res.send("create user");
});

userRouter.get("/signin", (req: Request, res: Response) => {
  res.send("sign in");
});

export default userRouter;
