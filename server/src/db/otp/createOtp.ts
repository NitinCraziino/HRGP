import { executeDbQuerySP } from "../executeDbQuery";
import query from "../query";
import { ValidationError } from "../../types/CustomError";
import { QueryResponse } from "../../types";

const createOtp = async (email: string, otp: string) => {
  const params = [email, otp];

  const result = await executeDbQuerySP<QueryResponse>(async () => {
    return await query(
      "CALL usp_CreateOtp(?, ?, @outParam1, @outParam2); SELECT @outParam1 AS isSuccess, @outParam2 AS error; ",
      params,
    );
  }, "createOtp");

  if (result.isSuccess !== 1) {
    throw new ValidationError(result.error, "createOtp");
  }

  return result;
};

export default createOtp;
