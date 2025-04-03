import { executeDbQueryDirect } from "../executeDbQuery";
import query from "../query";

type CityResponse = {
    cityId: string;
    cityName: string;
};

const findCity = async (city: string, stateId: string) => {
    const result = await executeDbQueryDirect<CityResponse>(async () => {
        return await query("SELECT * FROM tblCities WHERE city = ? AND stateId = ?", [city, stateId]);
    }, "findCity");

    return result;
};

export default findCity;                