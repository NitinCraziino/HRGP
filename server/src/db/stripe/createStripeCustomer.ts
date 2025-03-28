import { ValidationError } from "../../types/CustomError";
import { executeDbQuery } from "../../utils";
import query from "../query";
import { QueryResponse } from "../../types";


type CreateStripeCustomer = {
    userId: number;
    email: string;
    name: string;
    phone: string;
};

interface Response extends QueryResponse {
    stripeCustomerId: string;
}

const createStripeCustomer = async ({ userId, email, name, phone }: CreateStripeCustomer) => {
    const stripeCustomer = await executeDbQuery<Response>(async () => {
        return await query("CALL usp_CreateStripeCustomer(?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS error, @outParam2 AS stripeCustomerId, @outParam3 AS isSuccess; ", [userId, email, name, phone]);
    }, "createStripeCustomer");

    if (stripeCustomer.isSuccess !== 1) {
        throw new ValidationError(stripeCustomer.error, "createStripeCustomer");
    }

    return stripeCustomer.stripeCustomerId;
};

export default createStripeCustomer;
