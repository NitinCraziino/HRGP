import { getUserByEmail } from "../../db/user/getUser";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../types/CustomError";
import { jwtService } from "../../services/JwtService";
import { StatusCode } from "../../types";
import bcrypt from "bcryptjs";
import z, { ZodError } from "zod";
import { getCompanyByUserId } from "../../db/company/getCompany";

const signinController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = signinSchema.parse(req.body);

        const user = await getUserByEmail(validatedData.primaryEmail);

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

        const company = await getCompanyByUserId(user.userId!);

        if (!company) {
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
                primaryPhoneNumber: user.primaryPhoneNumber,
            },

            company: {
                companyId: user.companyId,
                companyName: company.companyName,
                companyAddress: company.companyAddressId,
                companyType: company.companyType,
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
    primaryEmail: z.string().email("Invalid primary email"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
