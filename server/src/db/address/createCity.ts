import { executeDbQuerySP } from "../executeDbQuery";
import query from '../query';
import { QueryResponse } from "../../types";
import { ValidationError } from "../../types/CustomError";

interface Response extends QueryResponse {
    cityId: string;
}

const createCity = async (city: string, stateId: string) => {
    // const result = await executeDbQuerySP<Response>(async () => {
    //     return await query("CALL usp_InsertCity(?, ?, @outParam1, @outParam2); SELECT @outParam1 AS error, @outParam2 AS isSuccess;", [city, stateId]);
    // }, "createCity");

    // if (result.isSuccess !== 1) {
    //     throw new ValidationError(result.error, "createCity");
    // }

    // return result.cityId;
    return "1";
};

export default createCity;          