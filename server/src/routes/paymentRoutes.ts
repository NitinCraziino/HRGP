import { Router } from "express";
import createSubscription from "../controllers/payment/createSubscriptionController";
import authMiddleware from "../middlewares/authMiddleware";
import addNewCardController from "../controllers/payment/addNewCardController";
import getPaymentMethodsController from "../controllers/payment/getPaymentMethodsController";
import deleteMethodController from "../controllers/payment/DeleteMethodController";

const router = Router();

router.post("/create-subscription", createSubscription);

router.use(authMiddleware);
router.post("/add-new-card", addNewCardController);
router.get("/", getPaymentMethodsController);
router.delete("/:methodId", deleteMethodController);

export default router;
