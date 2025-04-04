'use client';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import ButtonWithLoading from "../ButtonWithLoading";
import { memo, useState } from "react";
import useAuth from "@/hooks/states/useAuth";
import useCreateSubscription from "@/hooks/api/payment";
import { toast } from "sonner";

const PaymentForm = ({ setIsPaymentSuccess }: { setIsPaymentSuccess: (isPaymentSuccess: boolean) => void; }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { user } = useAuth();
    const { mutate: createSubscription, isPending } = useCreateSubscription();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (!stripe || !elements) {
                return;
            }

            if (!user || !user.stripeCustomerId || !user.companyId || !user.primaryEmail || !user.firstName || !user.lastName || !user.primaryPhone) {
                throw new Error("User data is missing.");
            }

            // Set loading state to true when the form is submitted
            setLoading(true);
            setErrorMessage("");  // Clear previous error message

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                throw new Error("Card details are required.");
            }

            // Create payment method
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
                throw new Error(error.message || "Payment method creation failed.");
            }

            // create subscription
            createSubscription({
                paymentMethodId: paymentMethod.id,
                customerId: user.stripeCustomerId,
                companyId: user.companyId,
                email: user.primaryEmail,
                name: user.firstName + " " + user.lastName,
                phone: user.primaryPhone,
                userId: user.userId
            }, {
                onError: (error: any) => {
                    const message = error.response.data.message || "Something wend wrong";
                    setErrorMessage(message);
                    toast.error(message);
                },
                onSuccess: (data) => {
                    setIsPaymentSuccess(true);
                    toast.success("Subscription created successfully");
                }
            }
            );

            // Set loading to false after the process is complete
        } catch (error: any) {
            setErrorMessage(error.message || "Something wend wrong");
            console.log(error);

        } finally {
            setLoading(false);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CardElement className="border border-gray-300 py-3 rounded-md p-2" />
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <ButtonWithLoading
                className="min-h-[40px] w-full rounded bg-indigo-600 text-white"
                isLoading={loading || isPending}
                type="submit"
            >
                Start Your Free Trial Now!
            </ButtonWithLoading>
        </form>
    );
};

export default memo(PaymentForm);
