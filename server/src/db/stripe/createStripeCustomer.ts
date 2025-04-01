import { ValidationError } from "../../types/CustomError";
import { executeDbQuery } from "../../utils";
import query from "../query";
import { QueryResponse } from "../../types";


type CreateStripeCustomer = {
    userId: number;
    companyId: number;
    customerId: string;
    subscriptionId: string;
    signUpOn: string;
};

interface Response extends QueryResponse {
    stripeCustomerId: string;
}

const createStripeCustomer = async ({ userId, companyId, customerId, subscriptionId, signUpOn }: CreateStripeCustomer) => {
    const params = [
        userId,
        companyId,
        customerId,
        subscriptionId,
        signUpOn
    ];
    const stripeCustomer = await executeDbQuery<Response>(async () => {
        return await query("CALL usp_InsertCompanyPaymentDetails(?, ?, ?, ?, ?, @outParam1, @outParam2); SELECT @outParam1 AS isSuccess, @outParam2 AS error; ", params);
    }, "createStripeCustomer");

    if (stripeCustomer.isSuccess !== 1) {
        throw new ValidationError(stripeCustomer.error, "createStripeCustomer");
    }

    return stripeCustomer.stripeCustomerId;
};

export default createStripeCustomer;
