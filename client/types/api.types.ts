export type SigninData = {
    email: string;
    password: string;
};

export type SignupData = {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    password: string;
    companyName: string;
    companyType: string;
    industryId: string;
    positionTitle: string;
};

export type SignupResponse = {
    userId: string;
    primaryEmail: string;
    primaryPhoneNumber: string;
    firstName: string;
    lastName: string;
    companyId: string;
    stripeCustomerId: string;
};

export interface CreateSubscriptionProps {
    paymentMethodId: string;
    customerId: string;
    companyId: string;
    email: string;
    name: string;
    phone: string;
    userId: string;
}