"use client";

import { memo, useState } from "react";
import useGetPaymentMethods from "@/hooks/api/payment/useGetPaymentMethods";
import DeleteCardDialog from "./DeleteCardDialog";
import { Card } from "@/types";
import useDeletePaymentMethod from "@/hooks/api/payment/useDeletePaymentMethod";
import { toast } from "sonner";
import { Column, DataTable } from "@/components/common/DataTable";


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


    const columns = [
        {
            header: "Card Number",
            cell: (card: Card) => `**** **** **** ${card.cardNumber}`,
        },
        { header: "Expiry", accessorKey: "expiryDate" },
        { header: "Name", accessorKey: "cardHolderName" },
        {
            header: "Primary",
            cell: (card: Card) => (card.isPrimary ? "✅" : "❎"),
        },
    ];

    return (
        <>
            <DataTable
                data={cards}
                columns={columns as Column<Card>[]}
                keyExtractor={(item) => item.id}
                actions={{
                    delete: {
                        onClick: (card) => setDeletingMethod(card),
                        isHidden: (card) => card.isPrimary,
                    },
                }}
                isLoading={false}
                emptyState="No cards found"
            />

            {deletingMethod && (
                <DeleteCardDialog
                    isOpen={!!deletingMethod}
                    onClose={() => setDeletingMethod(null)}
                    onDelete={() => handleDelete(deletingMethod!)}
                    method={deletingMethod!}
                />
            )}
        </ >
    );
};

export default memo(CardsList);