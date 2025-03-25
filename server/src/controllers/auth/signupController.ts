import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../types/CustomError";
import validator from "validator";
import bcrypt from "bcryptjs";
import { StatusCode } from "../../types";
import { query } from "../../config/db/query";
import { jwtService } from "../../services/JwtService";
import logger from "../../utils/logger";

const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            primaryEmail,
            primaryPhoneNumber,
            password,
            firstName,
            lastName,
            companyName,
            companyType,
            industryId,
            positionTitle,
        } = validateData(req.body);

        const hashedPassword = await bcrypt.hash(password, 10);

        const signupData = [
            firstName,
            lastName,
            hashedPassword,
            null,
            null,
            1,
            true,
            "Online",
            5,
            primaryPhoneNumber,
            primaryEmail,
            null,
            null,
            0
        ];


        const userData = await query<any>("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", signupData);
        console.log(userData);


        if (!userData.isSuccess) {
            throw new Error(userData.error);
        }

        const companyData = await query<{
            companyId: number;
            isSuccess: boolean;
            error: string;
        }>("CALL usp_UpsertCompanies(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            userData.userId,
            companyName,
            "",
            companyType,
            industryId,
            null,
            null,
            false,
            false,
            false,
            null,
            "Active",
        ]);

        if (!companyData.isSuccess) {

            throw new ValidationError(companyData.error);
        }

        const employeeData = await query<{
            employeeId: number;
            isSuccess: boolean;
            error: string;
        }>("CALL usp_UpsertEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            companyData.companyId,
            userData.userId,
            1,
            0,
            positionTitle,
            "Full-Time",
            true,
            new Date().toISOString().split('T')[0],
            "Active",
        ]);

        if (!employeeData.isSuccess) {
            throw new ValidationError(employeeData.error);
        }

        const jwtToken = jwtService.createToken({
            email: primaryEmail,
            userId: userData.userId.toString(),
            companyId: companyData.companyId.toString(),
            name: `${firstName} ${lastName}`,
        });

        console.log(userData, companyData, employeeData);

        res.status(StatusCode.CREATED).json({ userData, companyData, employeeData });
    } catch (error) {
        next(error);
    }
};

const validateData = (data: any) => {
    const {
        primaryEmail,
        primaryPhoneNumber,
        password,
        firstName,
        lastName,
        companyName,
        companyType,
        industryId,
        positionTitle,
    } = data;

    if (!data) {
        throw new ValidationError("Invalid data");
    }

    if (!primaryEmail || !primaryPhoneNumber || !password || !firstName || !lastName || !companyName || !companyType || !industryId || !positionTitle) {
        throw new ValidationError("All fields are required");
    }

    if (!validator.isEmail(primaryEmail)) {
        throw new ValidationError("Invalid primary email");
    }

    if (!validator.isMobilePhone(primaryPhoneNumber, "any")) {
        throw new ValidationError("Invalid primary phone number");
    }

    if (!validator.isStrongPassword(password, { minLength: 8 })) {
        throw new ValidationError("Password must be at least 8 characters long");
    }

    if (!validator.isLength(firstName, { min: 1, max: 50 })) {
        throw new ValidationError("First name must be between 1 and 50 characters");
    }

    if (!validator.isLength(lastName, { min: 1, max: 50 })) {
        throw new ValidationError("Last name must be between 1 and 50 characters");
    }

    if (!validator.isLength(companyName, { min: 1, max: 100 })) {
        throw new ValidationError("Company name must be between 1 and 100 characters");
    }

    if (!validator.isLength(companyType, { min: 1, max: 100 })) {
        throw new ValidationError("Company type must be between 1 and 100 characters");
    }

    if (!validator.isLength(industryId, { min: 1, max: 100 })) {
        throw new ValidationError("Industry ID must be between 1 and 100 characters");
    }

    if (!validator.isLength(positionTitle, { min: 1, max: 100 })) {
        throw new ValidationError("Position title must be between 1 and 100 characters");
    }

    return { primaryEmail, primaryPhoneNumber, password, firstName, lastName, companyName, companyType, industryId, positionTitle };
};

export default signupController;    