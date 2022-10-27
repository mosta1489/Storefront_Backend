/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";

const errHanler: ErrorRequestHandler = (err, _, res, __) => {
  console.log("Uncaught exception", err);
  if (err) {
    res.status(500).send(`Oops, ${err}`);
  }
  res.status(500).send(`Oops, an unexpected error occured, please try again`);
};
export default errHanler;
