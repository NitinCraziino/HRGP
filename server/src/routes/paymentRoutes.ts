import { Router } from "express";
import createSubscription from "../controllers/payment/createSubscriptionController";

const router = Router();

router.post("/create-subscription", createSubscription);

export default router;
