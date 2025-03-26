import { query } from "../../../config/db/query";
import { ValidationError } from "../../../types/CustomError";

const createEmployee = async (employeeData: {
    companyId: number;
    userId: number;
    positionTitle: string;
}) => {
    const employeeResponse = await query<any>("CALL usp_UpsertEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        employeeData.companyId,
        employeeData.userId,
        1,
        0,
        employeeData.positionTitle,
        "Full-Time",
        true,
        new Date().toISOString().split('T')[0],
        "Active",
    ]);

    return employeeResponse;
};

export default createEmployee;