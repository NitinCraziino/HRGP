import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormSetError, useWatch, Control } from "react-hook-form";
import { SignupSchemaType } from "@/lib/schema";
import { InputWithError } from "../ui/input";
import { useEffect, useState } from "react";
import { getLocationByPostalCode } from "@/lib/api/publicRoutes";
import useIsLoading from "@/hooks/states/useIsLoading";
type AddressInputsProps = {
    register: UseFormRegister<SignupSchemaType>;
    errors: FieldErrors<SignupSchemaType>;
    setValue: UseFormSetValue<SignupSchemaType>;
    setError: UseFormSetError<SignupSchemaType>;
    control: Control<SignupSchemaType>;
};

const AddressInputs = ({ register, errors, setValue, setError, control }: AddressInputsProps) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const setIsLoading = useIsLoading((state) => state.setIsLoading);

    const postalCode = useWatch({ control, name: "postalCode" });

    useEffect(() => {
        if (!postalCode || postalCode.length < 4) return;

        const timeout = setTimeout(async () => {
            try {
                setIsLoading(true);
                const location = await getLocationByPostalCode(postalCode);
                setValue("address", location.formattedAddress);
                setValue("country", location.country);
                setValue("state", location.state);
                setValue("city", location.city);
                setIsDisabled(true);
            } catch (error: any) {
                setError("postalCode", {
                    message: error?.response?.data?.message || "Invalid postal code",
                });
                setValue("address", "");
                setValue("country", "");
                setValue("state", "");
                setValue("city", "");
                setIsDisabled(false);
            } finally {
                setIsLoading(false);
            }
        }, 600); // 600ms debounce

        return () => clearTimeout(timeout);
    }, [postalCode]);

    return (
        <>
            <InputWithError
                label="Postal Code"
                error={errors.postalCode?.message}
                placeholder="Postal Code"
                className="py-0 px-4 w-full"
                {...register("postalCode")}
            />
            <InputWithError
                label="Address"
                error={errors.address?.message}
                placeholder="Address"
                className="py-0 px-4 w-full"
                {...register("address")}
            />
            <InputWithError
                label="City"
                error={errors.city?.message}
                placeholder="City"
                className="py-0 px-4 w-full"
                {...register("city")}
            />
            <InputWithError
                label="State"
                error={errors.state?.message}
                placeholder="State"
                className="py-0 px-4 w-full"
                {...register("state")}
                disabled={isDisabled}
            />
            <InputWithError
                label="Country"
                error={errors.country?.message}
                placeholder="Country"
                className="py-0 px-4 w-full"
                {...register("country")}
                disabled={isDisabled}
            />
        </>
    );
};

export default AddressInputs;
