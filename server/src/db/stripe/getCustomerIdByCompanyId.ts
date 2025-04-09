import { ValidationError } from "../../types/CustomError";
import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

const getCustomerIdByCompanyId = async (companyId: string) => {
    const customer = await executeDbQueryDirect(async () => {
        const result = await query<any>("SELECT * FROM CompanyPaymentDetails WHERE companyId = ?", [companyId]);
        return result;
    }, "getCustomerIdByUserId");

    if (!customer) {
        throw new ValidationError("Customer not found", "getCustomerIdByUserId");
    }

    return customer.stripeCustomerId;
};

export default getCustomerIdByCompanyId;
