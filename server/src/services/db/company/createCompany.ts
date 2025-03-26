import { query } from "../../../config/db/query";

const createCompany = async (companyData: {
    userId: number;
    companyName: string;
    companyType: string;
    industryId: string;
}) => {
    const params = [
        companyData.userId,
        companyData.companyName,
        "",
        companyData.companyType,
        companyData.industryId,
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