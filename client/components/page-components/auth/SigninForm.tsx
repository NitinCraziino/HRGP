"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputWithError from "@/components/form-components/InputWithError";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { signinSchema } from "@/lib/schema";
import useSignin from "@/hooks/api/auth/useSignin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";

const SigninForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "2a223xi@nno.com",
            password: "StrongaP@ssw0rd",
        }
    });

    const { mutate: signin, isPending } = useSignin();

    const onSubmit = (data: z.infer<typeof signinSchema>) => {
        signin(data, {
            onSuccess: () => {
                router.push("/");
                toast.success("Login successful", {
                    icon: "🔑"
                });
            },
            onError: (error: any) => {
                const message = error.response?.data?.message || "Something went wrong";
                toast.error(message);
            }
        });
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
                <Link href="/forgot-password" className="text-blue-600 hover:underline">
                    Forgot Password?
                </Link>
                <div className="flex items-center gap-1 sm:gap-2">
                    <Checkbox id="remember" defaultChecked />
                    <label htmlFor="remember" className="cursor-pointer">
                        Remember me
                    </label>
                </div>
            </div>

            <ButtonWithLoading
                isLoading={isPending}
                type="submit"
                className="py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right min-w-[100px]"
            >
                Login
            </ButtonWithLoading>

            <div className="text-start mt-16 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-[#5d45f8] hover:text-[#4a35d9] transition-colors">
                    Click here to sign up
                </Link>
            </div>
        </form>
    );
};

export default SigninForm;
