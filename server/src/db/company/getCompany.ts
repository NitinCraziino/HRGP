import { executeDbQueryDirect } from "../executeDbQuery";
import ICompany from "../../types/ICompany";
import query from "../query";
import { IUserWithCompany } from "../../types/IUser";

export const getCompanyById = async (companyId: string) => {
  const company = await executeDbQueryDirect<ICompany>(async () => {
    return await query<ICompany>("SELECT * FROM Companies WHERE companyId = ?", [companyId]);
  }, "getCompanyById");

  return company;
};

export const getCompanyWithUserByUserEmail = async (email: string) => {
  const company = await executeDbQueryDirect<IUserWithCompany>(async () => {
    return await query<IUserWithCompany>(
      "SELECT * FROM Users INNER JOIN Companies ON Users.companyId = Companies.companyId WHERE Users.primaryEmail = ?",
      [email],
    );
  }, "getCompanyByUserId");

  return company;
};
