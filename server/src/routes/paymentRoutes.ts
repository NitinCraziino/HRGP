import { Router } from "express";
import createSubscription from "../controllers/payment/createSubscriptionController";
import authMiddleware from "../middlewares/authMiddleware";
import addNewCardController from "../controllers/payment/addNewCardController";

const router = Router();

router.post("/create-subscription", createSubscription);

router.post("/add-new-card", authMiddleware, addNewCardController);

export default router;
