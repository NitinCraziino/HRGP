import { ValidationError } from "../../types/CustomError";
import { executeDbQuery } from "../../utils";
import query from "../query";

type EmployeeData = {
    companyId: number;
    userId: number;
    positionTitle: string;
    employeeCode?: string;
    managerId?: number;
    employeeType?: string;
    isRemoteWorking?: boolean;
    joiningDate?: string;
    employeeStatus?: string;
};

const createEmployee = async ({ companyId, userId, positionTitle, employeeCode, managerId, employeeType, isRemoteWorking, joiningDate, employeeStatus }: EmployeeData) => {
    const params = [
        companyId,
        userId,
        employeeCode || "",
        managerId || 0,
        positionTitle,
        employeeType || "",
        isRemoteWorking || false,
        joiningDate || '',
        employeeStatus || "active",
    ];
    const employeeResponse = await executeDbQuery<any>(async () => {
        return await query("CALL usp_UpsertEmployee(?, ?, ?, ?, ?, ?, ?, ?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS error, @outParam2 AS employeeId, @outParam3 AS isSuccess;", params);
    }, "createEmployee");

    console.log(employeeResponse);

    if (employeeResponse.isSuccess !== 1) {
        throw new ValidationError(employeeResponse.error, "createEmployee");
    }

    return employeeResponse;
};

export default createEmployee;