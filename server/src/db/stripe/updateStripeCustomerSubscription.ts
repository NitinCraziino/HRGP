import { ValidationError } from "../../types/CustomError";
import { executeDbQuery } from "../executeDbQuery";
import query from "../query";
import { QueryResponse } from "../../types";


type CreateStripeCustomer = {
    userId: string;
    companyId: string;
    customerId: string;
    subscriptionId: string;
    signUpOn: string;
};

interface Response extends QueryResponse {
    stripeCustomerId: string;
}

const updateStripeCustomerSubscription = async ({ userId, companyId, customerId, subscriptionId, signUpOn }: CreateStripeCustomer) => {
    const params = [
        userId,
        companyId,
        customerId,
        subscriptionId,
        signUpOn
    ];

    const stripeCustomer = await executeDbQuery<Response>(async () => {
        return await query("CALL usp_InsertCompanyPaymentDetails(?, ?, ?, ?, ?, @outParam1, @outParam2); SELECT @outParam1 AS isSuccess, @outParam2 AS error; ", params);
    }, "UpdateStripeCustomerSubscription");

    if (stripeCustomer.isSuccess !== 1) {
        throw new ValidationError(stripeCustomer.error, "UpdateStripeCustomerSubscription");
    }

    return stripeCustomer.stripeCustomerId;
};

export default updateStripeCustomerSubscription;
