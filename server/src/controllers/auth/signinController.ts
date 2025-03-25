import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../types/CustomError";
import validator from "validator";
import { StatusCode } from "../../types";

const signinController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || !validator.isEmail(email) || !validator.isLength(password, { min: 8 })) {
            throw new ValidationError("Invalid email or password");
        }

        res.status(StatusCode.OK).json({});
    } catch (error) {
        next(error);
    }
};

export default signinController;
