import { executeDbQuerySP } from "../executeDbQuery";
import query from '../query';
import { QueryResponse } from "../../types";
import { ValidationError } from "../../types/CustomError";

interface Response extends QueryResponse {
    cityId: string;
}

const createCity = async (userId: number, city: string, stateId: string) => {
    const params = [userId, city, stateId];
    const result = await executeDbQuerySP<Response>(async () => {
        return await query("CALL usp_InsertCities(?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS cityId;", params);
    }, "createCity");

    if (result.isSuccess !== 1) {
        throw new ValidationError(result.error, "createCity");
    }

    return result.cityId;
};

export default createCity;          