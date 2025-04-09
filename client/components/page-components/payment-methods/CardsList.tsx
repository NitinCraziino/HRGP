"use client";

import { memo, useState } from "react";
import useGetPaymentMethods from "@/hooks/api/payment/useGetPaymentMethods";
import { Button } from "@/components/ui/button";
import DeleteCardDialog from "./DeleteCardDialog";
import { Card } from "@/types";
import useDeletePaymentMethod from "@/hooks/api/payment/useDeletePaymentMethod";
import { toast } from "sonner";


const CardsList = () => {
    const { data, isLoading, error } = useGetPaymentMethods();
    const cards = data || [];
    const [deletingMethod, setDeletingMethod] = useState<Card | null>(null);
    const { mutate: deletePaymentMethod, isPending } = useDeletePaymentMethod();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleDelete = (method: Card) => {
        if (isPending || method.isPrimary) return;
        deletePaymentMethod(method.id, {
            onSuccess: () => {
                toast.success("Card deleted successfully");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        });
    };

    return (
        <div className="border rounded-none overflow-hidden">
            <table className="w-full border-collapse">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-4 font-medium text-gray-600 text-left border">Card Number</th>
                        <th className="p-4 font-medium text-gray-600 text-left border">Expiry</th>
                        <th className="p-4 font-medium text-gray-600 text-left border">Name</th>
                        <th className="p-4 font-medium text-gray-600 text-left border">Primary</th>
                        <th className="p-4 font-medium text-gray-600 border text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cards.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-4 border text-center">
                                No cards found
                            </td>
                        </tr>
                    )}
                    {cards.length > 0 && cards.map((card) => (
                        <tr key={card.id} className="hover:bg-gray-50 border-b">
                            <td className="p-4 ">
                                **** **** **** {card.cardNumber}
                            </td>
                            <td className="p-4 ">{card.expiryDate}</td>
                            <td className="p-4 ">{card.cardHolderName}</td>
                            <td className="p-4 ">
                                {card.isPrimary ? "✅ Primary" : ""}
                            </td>
                            <td className="p-4 flex justify-center">
                                <div className="flex gap-2">
                                    {!card.isPrimary && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                            onClick={() => setDeletingMethod(card)}
                                        >
                                            <i className="fas fa-trash-alt" />
                                        </Button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {deletingMethod && (
                <DeleteCardDialog
                    isOpen={!!deletingMethod}
                    onClose={() => setDeletingMethod(null)}
                    onDelete={() => handleDelete(deletingMethod!)}
                    method={deletingMethod!}
                />
            )}
        </div>
    );
};

export default memo(CardsList);