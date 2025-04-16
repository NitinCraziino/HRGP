import { QueryResponse } from "../../types";
import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

const deleteOtp = async (email: string) => {
  const params = [email];

  const result = await executeDbQueryDirect<QueryResponse>(async () => {
    return await query("DELETE FROM OTPs WHERE email = ?", params);
  }, "deleteOtp");

  return result;
};

export default deleteOtp;
