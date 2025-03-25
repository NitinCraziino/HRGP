import { Router } from "express";
import signupController from "../config/controllers/auth/signupController";

const router = Router();

router.post("/signup", signupController);

export default router;