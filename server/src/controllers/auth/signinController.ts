import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../types/CustomError";
import { jwtService } from "../../services/JwtService";
import { StatusCode } from "../../types";
import bcrypt from "bcryptjs";
import z, { ZodError } from "zod";
import { getCompanyWithUserByUserEmail } from "../../db/company/getCompany";

const signinController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = signinSchema.parse(req.body);

        const user = await getCompanyWithUserByUserEmail(validatedData.email);

        if (!user) {
            throw new ValidationError("Invalid email or password");
        }
        if (user.linkedinToken || user.googleToken) {
            throw new ValidationError("Please sign in with LinkedIn or Google");
        }

        const isPasswordValid = await bcrypt.compare(validatedData.password, user.hashedPassword!);

        if (!isPasswordValid) {
            throw new ValidationError("Invalid email or password");
        }


        if (!user.companyId) {
            throw new ValidationError("Company not found");
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
                primaryPhone: user.primaryPhone,
            },
            company: {
                companyId: user.companyId,
                companyName: user.companyName,
                companyType: user.companyType,
                companyAbout: user.companyAbout,
            }
        });

    } catch (error) {
        if (error instanceof ValidationError) {
            next(new ValidationError(error.message, "signinController"));
        } else if (error instanceof ZodError) {
            next(new ValidationError(error.errors.map(err => err.message).join(", "), "signinController"));
        } else {
            next(error);
        }
    }
};

export default signinController;



// Zod schema definition for validation
const signinSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email("Invalid email"),
    password: z.string({ required_error: "Password is required" }).min(8, "Password must be at least 8 characters long"),
});
