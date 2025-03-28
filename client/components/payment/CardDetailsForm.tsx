'use client';

import { CardElement, Elements } from "@stripe/react-stripe-js";
import ButtonWithLoading from "../ButtonWithLoading";
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/config";

const CardDetailsForm = () => {
    const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!);
    return (
        <Elements stripe={stripePromise}>
            <form className="flex flex-col gap-4">
                <CardElement
                    className="border border-gray-300 py-3 rounded-md p-2"
                />
                <ButtonWithLoading className="min-h-[40px] w-full rounded-none bg-indigo-600" isLoading={false}>
                    Start Your Free Trial Now!
                </ButtonWithLoading>
            </form>
        </Elements>
    );
};

export default CardDetailsForm;