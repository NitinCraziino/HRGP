import { getUserByEmail } from "../../db/user/getUser";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../types/CustomError";
import { jwtService } from "../../services/JwtService";
import { StatusCode } from "../../types";
import validator from "validator";
import bcrypt from "bcryptjs";

const signinController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || !validator.isEmail(email) || !validator.isLength(password, { min: 8 })) {
            throw new ValidationError("Invalid email or password");
        }

        const user = await getUserByEmail(email);

        if (!user) {
            throw new ValidationError("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword!);

        if (!isPasswordValid) {
            throw new ValidationError("Invalid email or password");
        }

        const token = jwtService.createToken({
            email: user.primaryEmail!,
            userId: user.userId!,
            name: `${user.firstName} ${user.lastName}`,
            companyId: user.companyId
        });

        res.status(StatusCode.OK).json({
            token,
        });

    } catch (error) {
        if (error instanceof ValidationError && error.name === "Unknown") {
            next(new ValidationError(error.message, "signinController"));
        } else {
            next(error);
        }
    }
};

export default signinController;
