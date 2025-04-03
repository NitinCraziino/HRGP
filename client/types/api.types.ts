export type SigninData = {
    email: string;
    password: string;
};

export interface MessageResponse {
    message: string;
}

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
    postalCode: string;
    country: string;
    state: string;
    city: string;
    address: string;
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

export interface ForgotPasswordData {
    email: string;
}

export interface VerifyVerificationCodeData {
    email: string;
    verificationCode: string;
}

export interface ResetPasswordData {
    email: string;
    newPassword: string;
    verificationCode: string;
}

export interface ResendVerificationCodeData {
    email: string;
}