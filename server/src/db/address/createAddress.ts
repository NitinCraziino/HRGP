import { executeDbQuery } from "../executeDbQuery";
import { QueryResponse } from "../../types";
import { ValidationError } from "../../types/CustomError";
import query from "../query";

type Address = {
  userId: string;
  companyId: string;
  branchAddress: string;
  addressType?: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  pincode: string;
};

interface AddressResponse extends QueryResponse {
  addressId: string;
}

const createAddress = async ({
  userId,
  companyId,
  branchAddress,
  addressType,
  countryId,
  stateId,
  cityId,
  pincode,
}: Address) => {
  const params = [
    userId,
    companyId,
    branchAddress,
    addressType || "Primary",
    countryId || 1,
    stateId || 1,
    cityId || 1,
    pincode,
  ];

  const result = await executeDbQuery<AddressResponse>(async () => {
    return await query(
      "CALL usp_InsertCompaniesBranchDetails(?, ?, ?, ?, ?, ?, ?, ?,  @outParam1, @outParam2, @outParam3); SELECT @outParam1 AS isSuccess, @outParam2 AS error, @outParam3 AS addressId;",
      params,
    );
  }, "createAddress");

  if (result.isSuccess !== 1) {
    throw new ValidationError(result.error, "createAddress");
  }

  return result.addressId;
};

export default createAddress;
