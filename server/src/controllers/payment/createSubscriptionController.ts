import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../../types";
import { paymentService } from "../../services/PaymentService";
import updateSubscriptionId from "../../db/stripe/updateSubscriptionId";

const createSubscription = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paymentMethodId, customerId, companyId, email, name, phone } = req.body;

        const subscription = await paymentService.createSubscription({ paymentMethodId, customerId, companyId, email, name, phone });

        // update the user with the subscription id in db
        await updateSubscriptionId(customerId, companyId, subscription.id);

        // update the db with the subscription details
        await updateSubscriptionId(customerId, companyId, subscription.id);

        if (subscription.items.data.map((item) => item.plan.id).includes("plan_1")) {

        }


        res.status(StatusCode.CREATED);
    } catch (error) {
        next(error);
    }
};

export default createSubscription;

