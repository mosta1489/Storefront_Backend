/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from "express";

const notFound: RequestHandler = (_, res) => {
  res.status(404).send(`Oops! page not found`);
};
export default notFound;
