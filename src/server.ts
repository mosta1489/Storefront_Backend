import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { requestLoggerMiddleware, errHanler, notFound } from "./middlewares";
import { userRouter, orderRouter, productRouter } from "./routes";
import { accessEnv } from "./helpers";
import cors from "cors";
const app: express.Application = express();
const port: string = accessEnv("PORT");

app.use(cors());
app.use(bodyParser.json());

app.use(requestLoggerMiddleware);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);

app.use(errHanler);
app.use(notFound);

app.listen(port, function () {
  console.log(` \n\t\t✌️\t\n\n server listeing on port: ${port}`);
});

export default app;
