import { Router } from "express";
import signupController from "../controllers/auth/signupController";
import signinController from "../controllers/auth/signinController";
import passport from "passport";
import { CLIENT_URL } from "../config";
import googleAuthController from "../config/controllers/auth/googleAuthController";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: `${CLIENT_URL}/signin` }), googleAuthController);

export default router;