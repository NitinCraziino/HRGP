import { Router } from "express";
import getUserCardInfoController from "../controllers/user/getUserCardInfoController";

const router = Router();


router.get("/card-info", getUserCardInfoController);



export default router;