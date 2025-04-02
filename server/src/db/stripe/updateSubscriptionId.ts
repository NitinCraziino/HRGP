import { ValidationError } from "../../types/CustomError";
import { QueryResponse } from "../../types";
import { executeDbQuery } from "../../utils";
import query from "../query";

const updateSubscriptionId = async (customerId: string, companyId: number, subscriptionId: string) => {
    const params = [customerId, companyId, subscriptionId];

    const result = await executeDbQuery<QueryResponse>(async () => {
        return await query("CALL usp_UpdateCompanyPaymentDetails(?, ?, ?, @outParam1, @outParam2); SELECT @outParam1 AS isSuccess, @outParam2 AS error; ", params);
    }, "updateSubscriptionId");

    if (result.isSuccess !== 1) {
        throw new ValidationError(result.error, "updateSubscriptionId");
    }

    return result;
};

export default updateSubscriptionId;    