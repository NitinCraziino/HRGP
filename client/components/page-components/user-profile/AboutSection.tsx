import { InputWithError } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import EditButton from "./EditButton";

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
        <div className="bg-gray-50 rounded-lg border shadow-sm text-gray-600">
            <div className="flex justify-between items-center p-4 ">
                <h2 className="font-medium text-lg">About</h2>
                <EditButton isEditing={isEditing} toggleEdit={toggleEdit} />

            </div>
            {!isEditing ? (
                <div className="p-4 ">
                    <p>Name: {firstName} {lastName}</p>
                    <p>Position: {position}</p>
                    <p>Start Date: {startDate}</p>
                </div>
            ) : (
                <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
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
                        className="mt-4 py-2 px-8 mb-4 rounded bg-gray-500 hover:bg-gray-600 text-sm float-right min-w-[100px]"
                    >
                        update
                    </ButtonWithLoading>
                </form>
            )}
        </div>
    );
};

export default AboutSection;