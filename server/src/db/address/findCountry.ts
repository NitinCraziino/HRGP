import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

type CountryResponse = {
    countryId: string;
    countryName: string;
};

const findCountry = async (country: string) => {
    const result = await executeDbQueryDirect<CountryResponse>(async () => {
        return await query("SELECT * FROM tblCountries WHERE country = ?", [country]);
    }, "findCountry");

    console.log(result);

    return result;
};

export default findCountry; 