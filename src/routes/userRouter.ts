import { Router, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware, isAdmin, isSameUser } from "../middlewares";

import {
  signUpHandler,
  signinHandler,
  deleteUserHandler,
  getAllUsers,
  makeAdmin,
} from "./../handlers/userHandler";
const userRouter = Router();

userRouter.post("/signup", asyncHandler(signUpHandler));

userRouter.post("/signin", asyncHandler(signinHandler));

userRouter.use(authMiddleware);

userRouter.get("/all", isAdmin, asyncHandler(getAllUsers));

userRouter.delete("/:id", isSameUser, asyncHandler(deleteUserHandler));

userRouter.post("/admin", asyncHandler(makeAdmin));

export default userRouter;
