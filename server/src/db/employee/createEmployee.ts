import query from "../query";

type EmployeeData = {
    companyId: number;
    userId: number;
    positionTitle: string;
};
const createEmployee = async ({ companyId, userId, positionTitle }: EmployeeData) => {
    const employeeResponse = await query<any>("CALL usp_UpsertEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        companyId,
        userId,
        1,
        0,
        positionTitle,
        "Full-Time",
        true,
        new Date().toISOString().split('T')[0],
        "Active",
    ]);

    return employeeResponse;
};

export default createEmployee;