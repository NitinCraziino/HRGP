'use client';

import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_PUBLISHABLE_KEY } from "@/config";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!);

const StripElementWrapper = ({ children }: { children: React.ReactNode; }) => (
    <Elements stripe={stripePromise}>
        {children}
    </Elements>
);

export default StripElementWrapper;
