import { NextFunction, Request, Response } from "express";
import z from 'zod';
import getCustomerIdByCompanyId from "../../db/stripe/getCustomerIdByCompanyId";
import { paymentService } from "../../services/PaymentService";
import { StatusCode } from "../../types";

const addNewCardController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { paymentMethodId, isPrimary } = addNewCardSchema.parse(req.body);
        const user = req.user;

        //@ts-ignore
        const customerId = await getCustomerIdByCompanyId(user.companyId);

        await paymentService.addNewCard({ paymentMethodId, isPrimary, customerId });

        res.status(StatusCode.CREATED).json({ message: "Card added successfully" });

    } catch (error) {
        next(error);
    }
};

const addNewCardSchema = z.object({
    paymentMethodId: z.string({ required_error: "Payment method ID is required" }),
    isPrimary: z.boolean({ required_error: "Is primary is required" })
});

export default addNewCardController;