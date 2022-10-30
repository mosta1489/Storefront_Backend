import { verifyToken } from "../helpers";
import { UserModel } from "../models";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error();
    }
    const payload = verifyToken(token);
    if (payload.isAdmin) {
      res.locals.isAdmin = payload.isAdmin;
      res.locals.userId = payload.userId;
      return next();
    }
    const user = await UserModel.getUserById(payload.userId);
    if (!user) {
      throw new Error();
    }
    res.locals.userId = user.id;
    res.locals.isAdmin = false;

    return next();
    //
  } catch (_) {
    return res.status(401).send({ error: "Bad Token" });
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdmin = res.locals.isAdmin;
  if (isAdmin) {
    res.locals.userId = res.locals.isAdmin;
    return next();
  } else {
    return res.status(401).send({ error: "Not Authorized" });
  }
};

export const isSameUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAdmin, userId } = res.locals;
  const reqestId = req.params.id;

  if (reqestId == userId) {
    res.locals.userId = userId;
    return next();
  }
  return res.status(401).send({ error: "Not Authorized" });
};
