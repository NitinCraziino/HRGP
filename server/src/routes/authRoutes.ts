import { Router } from "express";
import signupController from "../controllers/auth/signupController";
import signinController from "../controllers/auth/signinController";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

export default router;