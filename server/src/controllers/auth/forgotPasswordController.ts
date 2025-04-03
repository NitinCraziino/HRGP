import { NextFunction, Request, Response } from "express";
import { getUserByEmail } from "../../db/user/getUser";
import { StatusCode } from "../../types";
import { emailService } from "../../services/EmailService";
import { ValidationError } from "../../types/CustomError";
import createOtp from "../../db/otp/createOtp";

const forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new ValidationError("Email is required");
        }

        const user = await getUserByEmail(email);

        if (!user) {
            throw new ValidationError("User not found");
        }

        // TODO generate the verification code
        // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        const verificationCode = "123456"; // ! TODO remove this

        // TODO update the db with the verification code
        // await createOtp(email, verificationCode);

        await emailService.sendEmail({
            to: email,
            subject: "HRGP Email Verification Code",
            text: `
            Your verification code is: ${verificationCode}

            Thank you,
            HRGP Team
            `
        });

        res.status(StatusCode.OK).json({ message: "Verification code sent to email" });
    } catch (error) {
        next(error);
    }
};

export default forgotPasswordController;