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
        "", // company about
        companyType,
        industryId,
        null, // public name
        null, // logo url
        null, // banner url
        false, // is automated job code
        false, // is automated invoice no
        false, // is recruit for customers
        0, // company address id 
    ];

    const companyResponse = await executeDbQuery<CompanyResponse>(async () => {
        return await query<CompanyResponse>(`CALL usp_InsertCompanies(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS companyId;`, params);
    }, "createCompany");

    if (companyResponse.isSuccess !== 1) {
        throw new ValidationError(companyResponse.error, "createCompany");
    }

    return companyResponse.companyId;
};

export default createCompany;