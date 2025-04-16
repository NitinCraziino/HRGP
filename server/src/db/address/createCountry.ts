import { QueryResponse } from "../../types";
import { executeDbQuerySP } from "../executeDbQuery";
import query from "../query";
import { ValidationError } from "../../types/CustomError";

interface Response extends QueryResponse {
  countryId: string;
}

const createCountry = async (userId: number, country: string) => {
  const params = [userId, country];
  const result = await executeDbQuerySP<Response>(async () => {
    return await query(
      "CALL usp_InsertCountries(?, ?, @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS countryId;",
      params,
    );
  }, "createCountry");

  if (result.isSuccess !== 1) {
    throw new ValidationError(result.error, "createCountry");
  }

  return result.countryId;
};

export default createCountry;
