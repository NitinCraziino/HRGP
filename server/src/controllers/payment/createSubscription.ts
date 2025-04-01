import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types";
import { paymentService } from "../../services/PaymentService";

const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paymentMethodId, customerId, companyId, email, name, phone } = req.body;

        const subscription = await paymentService.createSubscription({ paymentMethodId, customerId, companyId, email, name, phone });

        // update the user with the subscription id in db


        // update the db with the subscription details

        res.status(StatusCode.CREATED).json(subscription);
    } catch (error) {
        next(error);
    }
};

export default createSubscription;
