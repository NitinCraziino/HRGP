import { Stripe } from 'stripe';
import { STRIPE_SECRET } from '../config';
import { PaymentError } from '../types/CustomError';

const stripe = new Stripe(STRIPE_SECRET!, {
    apiVersion: "2025-02-24.acacia"
});

type CustomerPayload = {
    email: string;
    name: string;
    phone: string;
};

export default class PaymentService {
    constructor() { }

    async createCustomer({ email, name, phone }: CustomerPayload): Promise<Stripe.Customer> {
        return this.tryCatch<Stripe.Customer>(async () => {
            const customer = await stripe.customers.create({ email, name, phone });
            return customer;
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