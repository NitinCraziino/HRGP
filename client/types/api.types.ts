export type SigninData = {
    email: string;
    password: string;
};

export type SignupData = {
    firstName: string;
    lastName: string;
    primaryEmail: string;
    primaryPhone: string;
    password: string;
    companyName: string;
    companyType: string;
    industryId: string;
    positionTitle: string;
};

export type SignupResponse = {
    userId: string;
    primaryEmail: string;
    primaryPhone: string;
    firstName: string;
    lastName: string;
    companyId: string;
    stripeCustomerId: string;
};

export type SigninResponse = {
    token: string;
    user: {
        userId: string;
        firstName: string;
        lastName: string;
        primaryEmail: string;
        companyId: string;
        primaryPhone: string;
        stripeCustomerId?: string;
    };
    company: {
        companyId: string;
        companyName: string;
        companyType: string;
        companyAbout: string;
    };
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