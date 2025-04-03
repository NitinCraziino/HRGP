import query from "../query";
import IUser from "../../types/IUser";
import { executeDbQueryDirect } from "../executeDbQuery";

export const getUserByEmail = async (email: string) => {
    return executeDbQueryDirect<IUser>(async () => {
        const response = await query<any>("SELECT * FROM Users WHERE primaryEmail = ?", [email]);
        return response;
    }, "getUserByEmail");
};

export const getUserById = async (id: string) => {
    return executeDbQueryDirect<IUser>(async () => {
        const response = await query<any>("SELECT * FROM Users WHERE userId = ?", [id]);
        return response;
    }, "getUserById");
};
