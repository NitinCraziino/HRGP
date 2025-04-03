import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types";
import updatePassword from "../../db/user/updatePassword";
import bcrypt from "bcryptjs";
import { ValidationError } from "../../types/CustomError";
import { z, ZodError } from "zod";
import getOtp from "../../db/otp/getOtp";
import deleteOtp from "../../db/otp/deleteOtp";

const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, verificationCode, newPassword } = resetPasswordSchema.parse(req.body);

        const otp = await getOtp(email, verificationCode);

        if (!otp) {
            throw new ValidationError("Invalid verification code");
        }

        // TODO delete the otp from the db
        // await deleteOtp(email);

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await updatePassword(email, hashedPassword);


        res.status(StatusCode.OK).json({ message: "Password reset successfully" });

    } catch (error) {
        if (error instanceof ValidationError) {
            next(new ValidationError(error.message, "resetPasswordController"));
        } else if (error instanceof ZodError) {
            next(new ValidationError(error.errors.map(err => err.message).join(", "), "resetPasswordController"));
        } else {
            next(error);
        }
    }
};

const resetPasswordSchema = z.object({
    verificationCode: z.string({ required_error: "Verification code is required" }),
    newPassword: z.string({ required_error: "New password is required" }).min(8, "Password must be at least 8 characters long"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
});

export default resetPasswordController;