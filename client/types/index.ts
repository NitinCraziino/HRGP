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
    linkedinToken?: string;
    modifiedBy?: string;
    modifiedDate?: string;
    activeStatus?: string;
    createdDate?: string;
    primaryPhone?: string;
    secondaryPhone?: string;
    stripeCustomerId?: string;
}


export interface ICompany {
    companyId: string;
    companyName: string;
    companyAbout: string;
    companyType: string;
    industryId: string;
    publicName: string;
    logoUrl: string;
    bannerUrl: string;
    isAutomatedJobCode: boolean;
    isAutomatedInvoiceNo: boolean;
    isRecruitForCustomers: boolean;
}
