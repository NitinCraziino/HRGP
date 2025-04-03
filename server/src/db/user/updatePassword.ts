import { QueryResponse } from "../../types";
import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";
import { ValidationError } from "../../types/CustomError";

const updatePassword = async (email: string, hashedPassword: string) => {
    const params = [
        email,
        hashedPassword
    ];

    const result = await executeDbQueryDirect<QueryResponse>(async () => {
        return await query("CALL usp_UpdatePassword(?, ?, @outParam1, @outParam2); SELECT @outParam1 AS error, @outParam2 AS isSuccess; ", params);
    }, "updatePassword");

    if (result.isSuccess !== 1) {
        throw new ValidationError(result.error, "updatePassword");
    }
};

export default updatePassword;
