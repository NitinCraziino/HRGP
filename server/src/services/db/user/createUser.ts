import bcrypt from "bcryptjs";
import { query } from "../../config/db/query";
import { ValidationError, ConflictError, InternalServerError } from "../../types/CustomError";

const createUser = async (userData: {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    password: string;
}) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const signupData = [
        userData.firstName,
        userData.lastName,
        hashedPassword,
        null,
        null,
        1,
        true,
        "Online",
        5,
        userData.primaryPhoneNumber,
        userData.primaryEmail,
        null,
        null,
        null,
        null,
        0
    ];

    const userResponse = await query<any>("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", signupData);

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