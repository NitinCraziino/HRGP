import { Router } from "express";
import authRoutes from "./authRoutes";
import paymentRoutes from "./paymentRoutes";
import webhookRoutes from "./webhookRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/payment", paymentRoutes);

router.use("/webhook", webhookRoutes);


export default router;