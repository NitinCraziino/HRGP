import { executeDbQuerySP } from "../executeDbQuery";
import query from "../query";
import { QueryResponse } from "../../types";
import { ValidationError } from "../../types/CustomError";

interface Response extends QueryResponse {
    stateId: string;
}

const createState = async (userId: number, state: string, countryId: string) => {
    const params = [userId, state, countryId];
    const result = await executeDbQuerySP<Response>(async () => {
        return await query("CALL usp_InsertStates(?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS stateId;", params);
    }, "createState");

    if (result.isSuccess !== 1) {
        throw new ValidationError(result.error, "createState");
    }

    return result.stateId;
};

export default createState; 