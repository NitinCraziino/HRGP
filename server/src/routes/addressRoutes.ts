import { Router } from "express";
import getLocationByPostalCodeController from "../controllers/address/getLocationByPostalCodeController";

const router = Router();


router.get("/:postalCode", getLocationByPostalCodeController);

export default router;
