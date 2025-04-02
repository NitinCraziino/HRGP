import { executeDbQueryDirect } from "../../utils";
import ICompany from "../../types/ICompany";
import query from "../query";

export const getCompanyById = async (companyId: string) => {
    const company = await executeDbQueryDirect<ICompany>(async () => {
        return await query<ICompany>("SELECT * FROM Companies WHERE companyId = ?", [companyId]);
    }, "getCompanyById");

    return company;
};

export const getCompanyByUserId = async (userId: string) => {
    const company = await executeDbQueryDirect<ICompany>(async () => {
        return await query<ICompany>("SELECT * FROM Companies WHERE userId = ?", [userId]);
    }, "getCompanyByUserId");

    return company;
};