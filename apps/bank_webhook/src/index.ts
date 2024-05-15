import express, { Request, Response, NextFunction , Express } from "express";
import helmet from "helmet";
import CheckError from "./utils/checkError";
import errorHandler from "./middleware/errorMiddleware";
import paymentRoutes from './routes/paymentRoutes';


const app:Express = express();
app.use(express.json());
app.use(helmet);


import "./database/connectDb";
app.use("/api/v0.1/transaction", paymentRoutes);
app.use(errorHandler);
app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API IS WORKING 🥳" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new CheckError(`Can't find ${req.originalUrl} on this server!`, 404));
});




app.listen(3003, () => {
  console.log(`[⚡] Server Is Running on http://localhost:3003`);
});

export default app;