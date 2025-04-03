import { QueryResponse } from "../../types";
import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

const getOtp = async (email: string, otp: string) => {
    const params = [
        email,
        otp
    ];

    const result = await executeDbQueryDirect<QueryResponse>(async () => {
        return await query("SELECT * FROM OTPs WHERE email = ? AND otp = ?", params);
    }, "getOtp");

    return result;
};

export default getOtp;
