import express, { Router } from "express";
import { paymentController } from "../controllers/bankController";

const router: Router = express.Router();

router.post("/hdfcWebhook", paymentController);

export default router;
