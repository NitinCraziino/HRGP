import { getUserByEmail } from "../../db/user/getUser";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../types/CustomError";
import { jwtService } from "../../services/JwtService";
import { StatusCode } from "../../types";
import bcrypt from "bcryptjs";
import z from "zod";

const signinController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = signinSchema.parse(req.body);

        const user = await getUserByEmail(validatedData.primaryEmail);

        if (!user) {
            throw new ValidationError("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(validatedData.password, user.hashedPassword!);

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
            user: {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName,
                primaryEmail: user.primaryEmail,
                companyId: user.companyId,
                primaryPhoneNumber: user.primaryPhoneNumber,
            }
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



// Zod schema definition for validation
const signinSchema = z.object({
    primaryEmail: z.string().email("Invalid primary email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
