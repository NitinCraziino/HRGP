import { CreateSubscriptionProps } from "@/types/api.types";
import api from "..";

export const createSubscription = async ({
    paymentMethodId,
    customerId,
    companyId,
    email,
    name,
    phone,
    userId
}: CreateSubscriptionProps) => {
    const response = await api.post("/payment/create-subscription", {
        paymentMethodId,
        customerId,
        companyId,
        email,
        name,
        phone,
        userId
    });
    return response.data;
};
