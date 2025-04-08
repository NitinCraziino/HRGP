import { Button } from "@/components/ui/button";
import { InputWithError } from "@/components/ui/input";
import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";

interface AboutSectionProps {
    firstName: string;
    lastName: string;
    position: string;
    startDate: string;
}

const aboutFormSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
});

const AboutSection = ({
    firstName,
    lastName,
    position,
    startDate,
}: AboutSectionProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<z.infer<typeof aboutFormSchema>>({
        resolver: zodResolver(aboutFormSchema),
        defaultValues: {
            firstName: firstName,
            lastName: lastName,
        },
    });

    const onSubmit = (data: z.infer<typeof aboutFormSchema>) => {
        console.log(data);
    };

    return (
        <div className="bg-white rounded-lg p-4 text-gray-600 text-sm relative">
            <Button
                variant="ghost"
                className="bg-transparent border-none rounded-full cursor-pointer absolute top-4 right-2 hover:bg-green-500 hover:text-white"
                type="button"
                size="icon"
                onClick={toggleEdit}
            >
                {isEditing ? (
                    <Check className="h-5 w-5" />
                ) : (
                    <Pencil className="h-5 w-5" />
                )}
            </Button>
            <h2 className="text-xl font-bold">About</h2>
            {!isEditing ? (
                <div className="mt-2 ">
                    <p>Name: {firstName} {lastName}</p>
                    <p>Position: {position}</p>
                    <p>Start Date: {startDate}</p>
                </div>
            ) : (
                <form className="mt-2 " onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 space-x-5">
                        <InputWithError
                            placeholder="First Name"
                            label="First Name"
                            className="w-full"
                            {...register("firstName")}
                        />
                        <InputWithError
                            placeholder="Last Name"
                            label="Last Name"
                            className="w-full"
                            {...register("lastName")}
                        />
                    </div>
                    <ButtonWithLoading
                        isLoading={isSubmitting}
                        className="mt-4 py-2 px-8 rounded bg-gray-500 hover:bg-gray-600 text-sm float-right min-w-[100px]"
                    >
                        update
                    </ButtonWithLoading>
                </form>
            )}
        </div>
    );
};

export default AboutSection;