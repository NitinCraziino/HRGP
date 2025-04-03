import { executeDbQuerySP } from "../executeDbQuery";
import query from "../query";
import { ValidationError } from "../../types/CustomError";
import { QueryResponse } from "../../types";

const updateCompanyId = async (userId: number, companyId: number) => {
    const params = [userId, companyId];
    console.log(params);
    const result = await executeDbQuerySP<QueryResponse>(async () => {
        return await query("CALL usp_UpdateCompanyforUser(?, ?, @outParam1, @outParam2); SELECT @outParam1 AS isSuccess, @outParam2 AS error", params);
    }, "updateCompanyId");

    if (result.isSuccess !== 1) {
        throw new ValidationError(result.error, "updateCompanyId");
    }

    return result;
};

export default updateCompanyId;