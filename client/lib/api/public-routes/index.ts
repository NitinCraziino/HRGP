import api from "..";
import { addressRoutes } from "@/config/api";

type Location = {
    formattedAddress: string;
    cityExists: boolean;
    country: string;
    state: string;
    city: string;
    postalCode: string;
};

export const getLocationByPostalCode = async (postalCode: string): Promise<Location> => {
    const response = await api.get(`${addressRoutes.getAddress}/${postalCode}`);
    return response.data;
};
