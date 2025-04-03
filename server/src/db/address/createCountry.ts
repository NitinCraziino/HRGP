import { QueryResponse } from "../../types";
import { executeDbQuerySP } from "../executeDbQuery";
import query from "../query";
import { ValidationError } from "../../types/CustomError";

interface Response extends QueryResponse {
    countryId: string;
}

const createCountry = async (country: string) => {
    // const result = await executeDbQuerySP<Response>(async () => {
    //     return await query("CALL usp_InsertCountry(?, @outParam1, @outParam2); SELECT @outParam1 AS error, @outParam2 AS isSuccess;", [country]);
    // }, "createCountry");

    // if (result.isSuccess !== 1) {
    //     throw new ValidationError(result.error, "createCountry");
    // }

    // return result.countryId;
    return "1";
};

export default createCountry;