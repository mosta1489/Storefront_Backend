import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { requestLoggerMiddleware, errHanler, notFound } from "./middlewares";
import { userRouter, orderRouter, productRouter } from "./routes";
import { accessEnv } from "./helpers";

const app: express.Application = express();
const port: string = accessEnv("PORT");

app.use(bodyParser.json());

app.use(requestLoggerMiddleware);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);

app.use(errHanler);
app.use(notFound);

app.listen(port, function () {
  console.log(`starting app on: ${port}`);
});

export default app;
