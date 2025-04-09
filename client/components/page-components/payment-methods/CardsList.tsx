"use client";

import { useState } from "react";
import { memo } from "react";
import { Button } from "@/components/ui/button";

type Card = {
    id: string;
    cardNumber: string;
    expiryDate: string;
    cardHolderName: string;
    isPrimary: boolean;
};

const CardsList = () => {
    const [deletingCard, setDeletingCard] = useState<Card | null>(null);
    const [cards, setCards] = useState<Card[]>([{
        id: "1",
        cardNumber: "1234567890123456",
        expiryDate: "01/24",
        cardHolderName: "John Doe",
        isPrimary: true,
    }, {
        id: "2",
        cardNumber: "1234567890123456",
        expiryDate: "01/24",
        cardHolderName: "John Doe",
        isPrimary: false,
    }]);

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
                                **** **** **** {card.cardNumber.slice(-4)}
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
                                            variant="outline"
                                            size="sm"
                                            onClick={() => { }}
                                        >
                                            Set Primary
                                        </Button>
                                    )}
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => { }}
                                        disabled={card.isPrimary}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default memo(CardsList);