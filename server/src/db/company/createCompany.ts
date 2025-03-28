import query from "../query";

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
        null,
        null
    ];
    console.log("params", params);

    const companyResponse = await query<any>("CALL usp_UpsertCompanies(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2)", params);
    console.log("companyResponse", companyResponse);

    const output = await query<any>("SELECT @outParam1 AS outParam1, @outParam2 AS outParam2");

    console.log("output", output);


    return companyResponse;
};

export default createCompany;

//     const userResponse = await executeDbQuery<any>(async () => {
//         return await query<any>("CALL usp_SignupUser(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2)", signupData);
//     }, "create");


//     const output = await query<any>("SELECT @outParam1 AS outParam1, @outParam2 AS outParam2");
//     console.log("Procedure Response:", userResponse);
//     console.log("Output Parameters:", output);
//     // const errorMessage = userResponse[0][0]?.MESSAGE_TEXT;
//     // const userId = userResponse[0][0]?.p_userId;

//     // if (errorMessage === "this Email or phone is already resgisterd.") {
//     //     throw new ConflictError("This email or phone number is already registered.", "create");
//     // } else if (errorMessage) {
//     //     throw new ValidationError(errorMessage, "create");
//     // }
//     // if (!userId) {
//     //     throw new InternalServerError("Failed to create user.", "create");
//     // }
