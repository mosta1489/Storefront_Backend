import { RequestHandler } from "express";

const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};
export default requestLoggerMiddleware;
