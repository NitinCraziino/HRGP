import { query } from "../../config/db/query";

type CompanyData = {
    userId: number;
    companyName: string;
    companyType: string;
    industryId: string;
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
        "Active",
        true,
        "",
        0
    ];

    const companyResponse = await query<any>("CALL usp_UpsertCompanies(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", params);

    console.log(companyResponse);

    return companyResponse;
};

export default createCompany;