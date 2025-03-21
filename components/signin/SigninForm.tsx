
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputWithError } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { signinSchema } from "@/lib/schema";

const SigninForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = (data: z.infer<typeof signinSchema>) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <InputWithError
                error={errors.email?.message || ""}
                type="email"
                placeholder="Email"
                className="py-3 px-4 w-full"
                {...register("email")}
            />

            <InputWithError
                error={errors.password?.message || ""}
                type="password"
                placeholder="Password"
                className="py-3 px-4 w-full"
                {...register("password")}
            />
            <div className="flex flex-row justify-between items-center text-[14px]  sm:text-sm gap-2 sm:gap-4">
                <Link href="/signup" className="text-blue-600 hover:underline">
                    Create new account
                </Link>
                <div className="flex items-center gap-1 sm:gap-2">
                    <Checkbox id="remember" defaultChecked />
                    <label htmlFor="remember" className="cursor-pointer">
                        Remember me
                    </label>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full py-3 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-lg"
            >
                Login
            </Button>
        </form>
    );
};

export default SigninForm;
