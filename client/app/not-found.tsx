"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <Button
                onClick={() => router.push("/")}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Go Home
            </Button>
        </div>
    );
};

export default NotFound;
