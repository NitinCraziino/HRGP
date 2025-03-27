import query from "../query";
import { ValidationError, ConflictError, InternalServerError } from "../../types/CustomError";
import { executeDbQuery } from "../../utils";

type UserData = {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    // this should be hashed
    hashedPassword: string;
};
const createUser = async ({ firstName, lastName, primaryEmail, primaryPhoneNumber, hashedPassword }: UserData) => {

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
        null,
        null,
        0
    ];

    const userResponse = await executeDbQuery<any>(async () => {
        return await query<any>("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", signupData);
    }, "USER_SERVICE");

    const errorMessage = userResponse[0][0]?.MESSAGE_TEXT;
    const userId = userResponse[0][0]?.p_userId;

    if (errorMessage === "this Email or phone is already resgisterd.") {
        throw new ConflictError("This email or phone number is already registered.", "USER_SERVICE");
    } else if (errorMessage) {
        throw new ValidationError(errorMessage, "USER_SERVICE");
    }
    if (!userId) {
        throw new InternalServerError("Failed to create user.", "USER_SERVICE");
    }

    return userId;
};

export default createUser;