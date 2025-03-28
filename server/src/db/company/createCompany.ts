import query from "../query";
import { executeDbQuery } from "../../utils";
import { ValidationError } from "../../types/CustomError";

type CompanyData = {
    userId: number;
    companyName: string;
    companyType: string;
    industryId: string;
};

type CompanyResponse = {
    isSuccess: number;
    error: string;
    companyId: number;
};

const createCompany = async ({ userId, companyName, companyType, industryId }: CompanyData) => {
    const params = [
        userId,
        companyName,
        "",
        companyType,
        industryId,
        null,
        null,
        null,
        false,
        false,
        false,
        0,
        "Active"
    ];

    const companyResponse = await executeDbQuery<CompanyResponse>(async () => {
        return await query<CompanyResponse>(`
            CALL usp_UpsertCompanies(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); 
            SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS companyId;
        `, params);
    }, "createCompany");

    if (companyResponse.isSuccess !== 1) {
        throw new ValidationError(companyResponse.error, "createCompany");
    }

    return companyResponse.companyId;
};

export default createCompany;