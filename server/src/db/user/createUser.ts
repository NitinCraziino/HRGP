import query from "../query";
import { ValidationError, ConflictError, InternalServerError } from "../../types/CustomError";
import { executeDbQuery } from "../../utils";
import { QueryResponse } from "../../types";

type UserData = {
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
}: UserData) => {

    const signupData = [
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
        return await query("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS userId; ", signupData);
    }, "createUser");


    if (userResponse.isSuccess !== 1) {
        throw new ValidationError(userResponse.error, "createUser");
    }


    return userResponse.userId;
};

export default createUser;