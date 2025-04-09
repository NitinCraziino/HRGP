import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type AddCardDialogProps = {
    open: boolean;
    onClose: () => void;
};

const AddCardDialogContent = ({ open, onClose }: AddCardDialogProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isPrimary, setIsPrimary] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);
        setErrorMessage("");  // Clear previous error messages

        try {
            const cardElement = elements.getElement(CardElement);

            if (!cardElement) {
                throw new Error("Card details are required.");
            }

            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
            });

            if (error) {
                throw new Error(error.message || "Failed to create payment method.");
            }

            if (paymentMethod) {

                onClose();
                toast.success("Card added successfully.");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong");
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full ">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New Card</DialogTitle>
                </DialogHeader>

                <div className="py-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                        <CardElement className="border border-gray-300 py-3 rounded-md p-2" />

                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                        <div className="mt-4 flex items-center space-x-2">
                            <Checkbox
                                id="primary"
                                checked={isPrimary}
                                className="data-[state=checked]:bg-white data-[state=checked]:border-gray-300"
                                onCheckedChange={(checked) => setIsPrimary(checked === true)}
                            />
                            <Label htmlFor="primary" className="text-base">
                                Primary
                            </Label>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                                disabled={!stripe || isLoading}
                            >
                                Add Card
                            </Button>
                            <Button
                                type="button"
                                onClick={onClose}
                                variant="outline"
                                className="bg-gray-200 hover:bg-gray-300 border-0 text-gray-700"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddCardDialogContent;
