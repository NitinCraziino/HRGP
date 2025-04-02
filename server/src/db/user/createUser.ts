import query from "../query";
import { ValidationError, ConflictError } from "../../types/CustomError";
import { executeDbQuery } from "../../utils";
import { QueryResponse } from "../../types";

type UserData = {
    companyId?: number;
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    // this should be hashed
    hashedPassword: string;
    profilePicUrl?: string;
    bannerUrl?: string;
    timezoneId?: number;
    isUserConcent?: boolean;
    userStatus?: string;
    roleId?: number;
    secondaryPhoneNumber?: string;
    secondaryEmail?: string;
    stripeCustomerId?: string;
    googleToken?: string;
    linkedinToken?: string;
};

interface Response extends QueryResponse {
    userId: number;
}

const createUser = async ({
    firstName,
    lastName,
    primaryEmail,
    primaryPhoneNumber,
    hashedPassword,
    profilePicUrl,
    bannerUrl,
    timezoneId,
    isUserConcent,
    userStatus,
    roleId,
    secondaryPhoneNumber,
    secondaryEmail,
    googleToken,
    linkedinToken,
    companyId,
}: UserData) => {

    const signupData = [
        companyId || 0,
        firstName,
        lastName,
        hashedPassword,
        profilePicUrl || null,
        bannerUrl || null,
        timezoneId || 1,
        isUserConcent || true,
        userStatus || "Online",
        roleId || 5,
        primaryPhoneNumber,
        primaryEmail,
        secondaryPhoneNumber || null,
        secondaryEmail || null,
        googleToken || null,
        linkedinToken || null,
    ];

    const userResponse = await executeDbQuery<Response>(async () => {
        return await query("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS userId; ", signupData);
    }, "createUser");


    if (userResponse.isSuccess !== 1) {
        if (userResponse.error.includes("this Email or phone is already resgisterd.")) {
            throw new ConflictError("Email or phone already exists", "createUser");
        }
        throw new ValidationError(userResponse.error, "createUser");
    }


    return userResponse.userId;
};

export default createUser;