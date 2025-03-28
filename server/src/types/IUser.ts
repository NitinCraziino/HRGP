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

export default IUser;