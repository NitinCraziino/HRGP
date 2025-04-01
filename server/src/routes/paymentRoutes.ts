import { Router } from "express";
import createSubscription from "../controllers/payment/createSubscription";

const router = Router();

router.post("/create-subscription", createSubscription);

export default router;
