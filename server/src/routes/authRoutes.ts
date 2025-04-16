import { Router } from "express";
import signupController from "../controllers/auth/signupController";
import signinController from "../controllers/auth/signinController";
import passport from "passport";
import { CLIENT_URL } from "../config";
import googleAuthController from "../controllers/auth/googleAuthController";
import forgotPasswordController from "../controllers/auth/forgotPasswordController";
import verifyVerificationCodeController from "../controllers/auth/verifyVerificationCodeController";
import resetPasswordController from "../controllers/auth/resetPasswordController";
import resendVerificationCodeController from "../controllers/auth/resendVerificationCode";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${CLIENT_URL}/signin`,
  }),
  googleAuthController,
);

router.post("/forgot-password", forgotPasswordController);
router.post("/verify-verification-code", verifyVerificationCodeController);
router.post("/reset-password", resetPasswordController);
router.post("/resend-verification-code", resendVerificationCodeController);

export default router;
