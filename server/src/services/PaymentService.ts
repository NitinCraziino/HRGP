import { Stripe } from 'stripe';
import { HRGP_SUBSCRIPTION_PRICE_ID, HRGP_TWILIO_NUMBER_PRICE_ID, STRIPE_SECRET } from '../config';
import { PaymentError } from '../types/CustomError';

const stripe = new Stripe(STRIPE_SECRET!, {
    apiVersion: "2025-02-24.acacia"
});

type CustomerPayload = {
    email: string;
    name: string;
    phone: string;
};

type CreateSubscriptionPayload = {
    paymentMethodId: string;
    customerId: string;
    companyId: string;
    email: string;
    name: string;
    phone: string;
};

export default class PaymentService {
    constructor() { }

    async createCustomer({ email, name, phone }: CustomerPayload): Promise<Stripe.Customer> {
        //@ts-ignore
        return this.tryCatch<Stripe.Customer>(async () => {
            const customer = await stripe.customers.create({ email, name, phone });
            return customer;
        });
    }

    async createSubscription({ paymentMethodId, customerId, companyId, email, name, phone }: CreateSubscriptionPayload): Promise<Stripe.Subscription> {
        return this.tryCatch<Stripe.Subscription>(async () => {
            // Attach payment method to customer
            await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

            await stripe.customers.update(customerId, {
                invoice_settings: { default_payment_method: paymentMethodId },
            });

            // Define subscription details
            const subscription = await stripe.subscriptions.create({
                customer: customerId,
                metadata: { companyId, email, name, phone },
                items: [
                    { price: HRGP_SUBSCRIPTION_PRICE_ID },
                    { price: HRGP_TWILIO_NUMBER_PRICE_ID },
                ],
                trial_period_days: 30,
                expand: ["latest_invoice.payment_intent"],
            });


            return subscription;
        });
    }


    private async tryCatch<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (error) {
            if (error instanceof Error) {
                throw new PaymentError(error.message, "PaymentService");
            }
            throw error;
        }
    }
}


export const paymentService = new PaymentService();