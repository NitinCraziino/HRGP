import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../../../types/CustomError";
import validator from "validator";
import bcrypt from "bcryptjs";
import { StatusCode } from "../../../types";
import { query } from "../../db/query";
import assert from "assert";

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

        const userData = await query<{
            userId: number;
            isSuccess: boolean;
            error: string;
        }>("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            firstName,
            lastName,
            hashedPassword,
            null,
            null,
            1,
            true,
            "Online",
            5,
            primaryEmail,
            primaryPhoneNumber,
            null,
            null
        ]);

        if (!userData.isSuccess) {
            throw new ValidationError(userData.error);
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

    // do assertions for all fields
    // this is to ensure that the data is valid
    // if the data is not valid, it will throw an error
    // this is to ensure that the data is not null
    assert(primaryEmail, "primaryEmail is required");
    assert(primaryPhoneNumber, "primaryPhoneNumber is required");
    assert(password, "password is required");
    assert(firstName, "firstName is required");
    assert(lastName, "lastName is required");
    assert(companyName, "companyName is required");
    assert(companyType, "companyType is required");
    assert(industryId, "industryId is required");
    assert(positionTitle, "positionTitle is required");

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