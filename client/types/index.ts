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

export interface AuthStateUser {
  userId: string;
  firstName: string;
  lastName: string;
  primaryEmail: string;
  companyId: string;
  primaryPhone: string;
  stripeCustomerId?: string;
}

export interface AuthStateCompany {
  companyId: string;
  companyName: string;
  companyAbout: string;
  companyType: string;
  industryId: string;
}

export type TemplateType = "text" | "email";

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  content: string;
}

export type Role = {
  id: string;
  name: string;
  isOn: boolean;
  hasHelp?: boolean;
  permissions: Permissions;
};

export type Permissions = {
  ATS: string;
  EMS: string;
  FILES: string;
  TOOLS: string;
};

export type Card = {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardHolderName: string;
  isPrimary: boolean;
};

export type SizeVariant = "xs" | "sm" | "md" | "lg";
