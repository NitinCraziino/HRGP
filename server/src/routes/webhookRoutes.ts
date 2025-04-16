import { Router } from "express";
import webhookController from "../controllers/payment/webhookController";

const router = Router();

router.post("/invoice-paid", webhookController);

export default router;
