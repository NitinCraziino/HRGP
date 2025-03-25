import { Router } from "express";
import authRoutes from "./authRoutes";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.use("/api", authRoutes);

export default router;