import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types";
import getOtp from "../../db/otp/getOtp";
import { ValidationError } from "../../types/CustomError";

const verifyVerificationCodeController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, verificationCode } = req.body;

    // TODO get the otp from the db
    // const otp = await getOtp(email, verificationCode);
    const otp = "123456";

    if (!otp) {
      throw new ValidationError("Invalid verification code");
    }

    res.status(StatusCode.OK).json({
      message: "Verification code verified",
    });
  } catch (error) {
    next(error);
  }
};

export default verifyVerificationCodeController;
