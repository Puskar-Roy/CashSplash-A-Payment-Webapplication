import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import CheckError from "./utils/checkError";
import errorHandler from "./middleware/errorMiddleware";
import { PaymentInformationDTO } from "./interfaces";

const app = express();
app.use(express.json());
app.use(helmet);

app.post("/hdfcWebhook", (req, res) => {
  const paymentInformation: PaymentInformationDTO = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
  } catch (error) {
    console.error(error);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API IS WORKING 🥳" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);


app.listen(3003, () => {
  console.log(`[⚡] Server Is Running on http://localhost:3003`);
});

export default app;