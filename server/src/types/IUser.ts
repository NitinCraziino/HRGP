interface IUser {
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
}


// google auth user
export const demoUserGoogle: IUser = {
    userId: "1234567890",
    lastName: "Doe",
    primaryEmail: "john.doe@example.com",
    roleId: 1,
    firstName: "John",
    isUserConcent: true,
    userStatus: "active",
    timezoneId: 1,
    profilePicUrl: "https://example.com/profile.jpg",
    bannerUrl: "https://example.com/banner.jpg",
    secondaryPhone: "1234567890",
    secondaryEmail: "john.doe@example.com",
    hashedPassword: "1234567890",
    primaryPhone: "1234567890",
    createdBy: "1234567890",
    createdDate: "2021-01-01",
    modifiedBy: "1234567890",
    modifiedDate: "2021-01-01",
    activeStatus: "active",
    companyId: "1234567890",

};

export default IUser;