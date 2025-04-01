'use client';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ButtonWithLoading from "../ButtonWithLoading";
import { useState } from "react";
import useAuth from "@/hooks/states/useAuth";
import { createSubscription } from "@/lib/api/payment";

const CardDetailsForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useAuth();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        if (!user || !user.stripeCustomerId || !user.companyId || !user.primaryEmail || !user.firstName || !user.lastName || !user.primaryPhone) {
            setErrorMessage("User data is missing.");
            setLoading(false);
            return;
        }


        setLoading(true);
        setErrorMessage("");


        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setErrorMessage("Card details are required.");
            setLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
                name: user.firstName + " " + user.lastName,
                email: user.primaryEmail,
                phone: user.primaryPhone
            },
        });

        if (error) {
            setErrorMessage(error.message || "Payment method creation failed.");
            setLoading(false);
            return;
        }

        const { data } = await createSubscription({
            paymentMethodId: paymentMethod.id,
            customerId: user.stripeCustomerId,
            companyId: user.companyId,
            email: user.primaryEmail,
            name: user.firstName + " " + user.lastName,
            phone: user.primaryPhone,
        });

        console.log(data);

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CardElement className="border border-gray-300 py-3 rounded-md p-2" />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <ButtonWithLoading
                className="min-h-[40px] w-full rounded bg-indigo-600 text-white"
                isLoading={loading}
                type="submit"
            >
                Start Your Free Trial Now!
            </ButtonWithLoading>
        </form>
    );
};

export default CardDetailsForm;
