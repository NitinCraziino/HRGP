import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../../types";
import axios from "axios";
import { InternalServerError } from "../../types/CustomError";

const getLocationByPostalCodeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postalCode } = req.params;
        const location = await getLocation(postalCode);

        const results = location?.results;

        if (!results || results.length === 0) {
            res.status(StatusCode.NOT_FOUND).json({
                message: "No location found for the given postal code",
            });
            return;
        }

        const formattedAddress = results[0].formatted_address;
        const addressParts = formattedAddress.split(",").map((part: string) => part.trim());
        const partsCount = addressParts.length;

        let processedAddress = "";
        let cityExists = false;

        if (partsCount > 2) {
            cityExists = true;
            processedAddress = `${addressParts[partsCount - 3]}, ${addressParts[partsCount - 2]}, ${addressParts[partsCount - 1]}`;
        } else {
            processedAddress = `${addressParts[partsCount - 2]}, ${addressParts[partsCount - 1]}`;
        }

        const country = results[0].address_components[results[0].address_components.length - 1].long_name;
        const state = results[0].address_components[results[0].address_components.length - 2].long_name;
        const city = results[0].address_components[results[0].address_components.length - 3].long_name;

        res.status(StatusCode.OK).json({
            formattedAddress: processedAddress,
            cityExists,
            country,
            state,
            city,
            postalCode
        });
    } catch (error) {
        next(error);
    }
};

const getLocation = async (postalCode: string) => {
    try {
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&sensor=true&key=AIzaSyCDLc8UtW0iQKxoOWNWOb9tIt8pKgOMSl8`,
            {
                headers: {
                    "cache-control": "no-cache",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching location:", error);
        throw new InternalServerError("Error fetching location", "getLocation");
    }
};

export default getLocationByPostalCodeController;
