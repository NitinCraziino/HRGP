export type SignupFormData = {
    email?: string;
    password?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    positionTitle?: string;
    companyName?: string;
    companyType?: string;
    industry?: string;
};

export interface IUser {
    userId: string;
    firstName?: string; // required
    lastName: string; // required
    hashedPassword?: string; // required
    profilePicUrl?: string;
    bannerUrl?: string;
    timezoneId?: number; // required
    isUserConcent?: boolean; // required
    userStatus?: string; // required
    roleId?: number; // required
    primaryEmail: string; // required
    secondaryEmail?: string;
    linkedinId?: string;
    googleId?: string;
    // companyId is the id of the company that the user belongs to
    companyId?: string;
    createdBy?: string;
    googleToken?: string;
    linkdenToken?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    activeStatus?: string;
    createdDate?: string;
    primaryPhone?: string;
    secondaryPhone?: string;
    stripeCustomerId?: string;
}

