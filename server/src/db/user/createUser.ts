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
    ];

    const userResponse = await executeDbQuery<Response>(async () => {
        return await query("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS error, @outParam2 AS userId, @outParam3 AS isSuccess; ", signupData);
    }, "createUser");

    console.log(userResponse);

    // const errorMessage = userResponse[0][0]?.MESSAGE_TEXT;
    // const userId = userResponse[0][0]?.p_userId;

    // if (errorMessage === "this Email or phone is already resgisterd.") {
    //     throw new ConflictError("This email or phone number is already registered.", "createUser");
    // } else if (errorMessage) {
    //     throw new ValidationError(errorMessage, "createUser");
    // }
    // if (!userId) {
    //     throw new InternalServerError("Failed to create user.", "createUser");
    // }

    return 'userId';
};

export default createUser;