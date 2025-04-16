import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

type CountryResponse = {
  countryId: string;
  countryName: string;
};

const findCountry = async (country: string) => {
  const result = await executeDbQueryDirect<CountryResponse>(async () => {
    return await query("SELECT * FROM Countries WHERE countryName = ?", [country]);
  }, "findCountry");

  return result;
};

export default findCountry;
