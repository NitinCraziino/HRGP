import { CreateSubscriptionProps } from "@/types/api.types";
import api from "..";
import { paymentRoutes } from "@/config/api";

export const createSubscription = async ({
    paymentMethodId,
    customerId,
    companyId,
    email,
    name,
    phone,
    userId
}: CreateSubscriptionProps) => {
    const response = await api.post(paymentRoutes.createSubscription, {
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
