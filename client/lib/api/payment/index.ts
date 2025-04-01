import api from "..";

export const createSubscription = async ({
    paymentMethodId,
    customerId,
    companyId,
    email,
    name,
    phone,
}: {
    paymentMethodId: string;
    customerId: string;
    companyId: string;
    email: string;
    name: string;
    phone: string;
}) => {
    const response = await api.post("/payment/create-subscription", {
        paymentMethodId,
        customerId,
        companyId,
        email,
        name,
        phone,
    });
    return response.data;
};
