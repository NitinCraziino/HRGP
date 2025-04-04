import { GetRoutesWithParams } from "@/types/api/GetRoutes";
import { GET } from ".";

type Location = {
    formattedAddress: string;
    cityExists: boolean;
    country: string;
    state: string;
    city: string;
    postalCode: string;
};

export const getLocationByPostalCode = async (postalCode: string): Promise<Location> => {
    const response = await GET<Location>({
        route: GetRoutesWithParams.GetAddress,
        params: { postalCode }
    });
    return response;
};
