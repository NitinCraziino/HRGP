import { NextFunction, Request, Response } from "express";
import getCustomerIdByCompanyId from "../../db/stripe/getCustomerIdByCompanyId";
import { paymentService } from "../../services/PaymentService";
import { StatusCode } from "../../types";

const getPaymentMethodsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //@ts-ignore
        const companyId = req.user.companyId;

        const customerId = await getCustomerIdByCompanyId(companyId);

        const paymentMethods = await paymentService.getPaymentMethods(customerId);

        const stripeCustomer = await paymentService.getStripeCustomer(customerId);

        const filteredPaymentMethods = paymentMethods.map(paymentMethod => {
            return {
                id: paymentMethod.id,
                cardNumber: paymentMethod.card?.last4,
                expiryDate: `${paymentMethod.card?.exp_month}/${paymentMethod.card?.exp_year}`,
                cardHolderName: paymentMethod.billing_details?.name,
                isPrimary: paymentMethod.id === stripeCustomer.invoice_settings?.default_payment_method
            };
        });

        res.status(StatusCode.OK).json(filteredPaymentMethods);
    } catch (error) {
        next(error);
    }
};

export default getPaymentMethodsController;