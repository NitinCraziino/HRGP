import query from "../query";
import { executeDbQuery } from "../../utils";
import { ValidationError } from "../../types/CustomError";
import { QueryResponse } from "../../types";

type CompanyData = {
    userId: number;
    companyName: string;
    companyType: string;
    industryId: string;
    companyAbout?: string;
    publicName?: string;
    logoUrl?: string;
    bannerUrl?: string;
    isAutomatedJobCode?: boolean;
    isAutomatedInvoiceNo?: boolean;
    isRecruitForCustomers?: boolean;
};

interface Response extends QueryResponse {
    companyId: number;
}

const createCompany = async ({ userId, companyName, companyType, industryId, companyAbout, publicName, logoUrl, bannerUrl, isAutomatedJobCode, isAutomatedInvoiceNo, isRecruitForCustomers }: CompanyData) => {
    const params = [
        userId,
        companyName,
        companyAbout || "",
        companyType,
        industryId,
        publicName || null,
        logoUrl || null,
        bannerUrl || null,
        isAutomatedJobCode || false,
        isAutomatedInvoiceNo || false,
        isRecruitForCustomers || false,
    ];

    const companyResponse = await executeDbQuery<Response>(async () => {
        return await query(`CALL usp_InsertCompanies(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS companyId;`, params);
    }, "createCompany");

    if (companyResponse.isSuccess !== 1) {
        throw new ValidationError(companyResponse.error, "createCompany");
    }

    return companyResponse.companyId;
};

export default createCompany;