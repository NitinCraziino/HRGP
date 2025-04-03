import { executeDbQuerySP } from "../executeDbQuery";
import query from "../query";
import { QueryResponse } from "../../types";
import { ValidationError } from "../../types/CustomError";

interface Response extends QueryResponse {
    stateId: string;
}

const createState = async (state: string, countryId: string) => {
    // const result = await executeDbQuerySP<Response>(async () => {
    //     return await query("CALL usp_InsertState(?, ?, @outParam1, @outParam2); SELECT @outParam1 AS error, @outParam2 AS isSuccess;", [state, countryId]);
    // }, "createState");

    // if (result.isSuccess !== 1) {
    //     throw new ValidationError(result.error, "createState");
    // }

    // return result.stateId;
    return "1";
};

export default createState; 