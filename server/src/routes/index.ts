import { Router } from "express";
import authRoutes from "./authRoutes";

const router = Router();

router.use("/auth", authRoutes);

router.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        console.log(req.user);
        res.send("Hello World");
    } else {
        console.log('Not authenticated');
        res.send("Not authenticated");
    }
});

export default router;