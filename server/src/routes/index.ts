import { Router } from "express";
import authRoutes from "./authRoutes";
import paymentRoutes from "./paymentRoutes";
import webhookRoutes from "./webhookRoutes";
import addressRoutes from "./addressRoutes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/payment", paymentRoutes);
router.use("/address", addressRoutes);

router.use("/webhook", webhookRoutes);


export default router;