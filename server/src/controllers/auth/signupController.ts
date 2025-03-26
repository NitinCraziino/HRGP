import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../types/CustomError";
import validator from "validator";
import { StatusCode } from "../../types";
import createUser from "../../db/user/createUser";
import createCompany from "../../db/company/createCompany";
import bcrypt from "bcryptjs";

const signupController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = validateData(req.body);

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);

        const userId = await createUser({
            ...validatedData,
            hashedPassword,
        });

        const companyResponse = await createCompany({
            userId,
            companyName: validatedData.companyName,
            companyType: validatedData.companyType,
            industryId: validatedData.industryId,
        });

        // const employeeResponse = await createEmployee({
        //     companyId: companyResponse[0].companyId,
        //     userId,
        //     positionTitle: validatedData.positionTitle,
        // });


        res.status(StatusCode.CREATED).json();
    } catch (error) {
        if (error instanceof ValidationError && error.location === "Unknown") {
            next(new ValidationError(error.message, "SIGNUP_CONTROLLER"));
        }
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