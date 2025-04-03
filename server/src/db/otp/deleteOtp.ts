import { QueryResponse } from "../../types";
import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

const deleteOtp = async (email: string, otp: string) => {
    const params = [
        email,
        otp
    ];

    const result = await executeDbQueryDirect<QueryResponse>(async () => {
        return await query("DELETE FROM OTPs WHERE email = ? AND otp = ?", params);
    }, "deleteOtp");

    return result;
};

export default deleteOtp;
