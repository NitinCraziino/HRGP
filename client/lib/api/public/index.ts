import api from "..";

type Location = {
    formattedAddress: string;
    cityExists: boolean;
    country: string;
    state: string;
    city: string;
    postalCode: string;
};

export const getLocationByPostalCode = async (postalCode: string): Promise<Location> => {
    const response = await api.get(`/address/${postalCode}`);
    return response.data;
};
