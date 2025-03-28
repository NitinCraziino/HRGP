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
        null,// profile pic url
        null,// banner url
        1,// timezone id
        true,// is user concent
        "Online",// user status
        5,// role id
        primaryPhoneNumber,
        primaryEmail,
        null, // secondary phone number
        null, // secondary email
    ];

    const userResponse = await executeDbQuery<any>(async () => {
        return await query<any>("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS error, @outParam2 AS userId, @outParam3 AS isSuccess; ", signupData);
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