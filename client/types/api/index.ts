import { PostRoutes, PostRoutesWithParams } from "./PostRoutes";
import { GetRoutes, GetRoutesWithParams } from "./GetRoutes";
import { PutRoutes, PutRoutesWithParams } from "./PutRoutes";
import { DeleteRoutes, DeleteRoutesWithParams } from "./DeleteRoutes";
import { PatchRoutes, PatchRoutesWithParams } from "./PatchRoutes";

export interface PostParams {
    route: PostRoutes | PostRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface GetParams {
    route: GetRoutes | GetRoutesWithParams;
    params?: Record<string, string>;
};

export interface PutParams {
    route: PutRoutes | PutRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface DeleteParams {
    route: DeleteRoutes | DeleteRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface PatchParams {
    route: PatchRoutes | PatchRoutesWithParams;
    params?: Record<string, string>;
    body?: Record<string, any>;
};

export interface MessageResponse {
    message: string;
}

export interface SignupData {
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

export interface SignupResponse {
    userId: string;
    primaryEmail: string;
    primaryPhone: string;
    firstName: string;
    lastName: string;
    companyId: string;
    stripeCustomerId: string;
};


export interface SigninData {
    email: string;
    password: string;
};

export interface SigninResponse {
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