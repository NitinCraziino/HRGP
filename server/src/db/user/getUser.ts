import query from "../query";
import IUser from "../../types/IUser";
import { executeDbQuery } from "../../utils";

export const getUserByEmail = async (email: string) => {
    return executeDbQuery<IUser>(async () => {
        const response = await query<any>("SELECT * FROM Users WHERE primaryEmail = ?", [email]);
        return response[0];
    }, "getUserByEmail");
};

export const getUserById = async (id: string) => {
    return executeDbQuery<IUser>(async () => {
        const response = await query<any>("SELECT * FROM Users WHERE userId = ?", [id]);
        return response[0];
    }, "getUserById");
};

