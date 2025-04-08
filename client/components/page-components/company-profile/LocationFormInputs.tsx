import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormSetError, useWatch, Control, UseFormGetValues, UseFormWatch } from "react-hook-form";
import { InputWithError } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getLocationByPostalCode } from "@/lib/api/publicRoutes";
import useIsLoading from "@/hooks/states/useIsLoading";
import { LocationFormInputs } from "./LocationsSection";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
type LocationFormInputsProps = {
    register: UseFormRegister<LocationFormInputs>;
    errors: FieldErrors<LocationFormInputs>;
    setValue: UseFormSetValue<LocationFormInputs>;
    setError: UseFormSetError<LocationFormInputs>;
    control: Control<LocationFormInputs>;
    values?: {
        addressType: string;
        address: string;
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
    onSubmit: (data: LocationFormInputs) => void;
    getValues: UseFormGetValues<LocationFormInputs>;
    isLoading: boolean;
    watch: UseFormWatch<LocationFormInputs>;
};

const LocationFormInput = ({
    register,
    errors,
    setValue,
    setError,
    control,
    values,
    onSubmit,
    getValues,
    isLoading,
    watch
}: LocationFormInputsProps) => {
    const [isDisabled, setIsDisabled] = useState(false);
    const setIsLoading = useIsLoading((state) => state.setIsLoading);

    const postalCode = useWatch({ control, name: "postalCode" });

    useEffect(() => {
        if (values) {
            setValue("address", values.address);
            setValue("country", values.country);
            setValue("state", values.state);
            setValue("city", values.city);
            setValue("postalCode", values.postalCode);
        }
    }, [values]);

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
                setValue("address", values?.address || "");
                setValue("country", values?.country || "");
                setValue("state", values?.state || "");
                setValue("city", values?.city || "");
                setIsDisabled(false);
            } finally {
                setIsLoading(false);
            }
        }, 600); // 600ms debounce

        return () => clearTimeout(timeout);
    }, [postalCode]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({
            address: getValues("address"),
            addressType: getValues("addressType"),
            city: getValues("city"),
            state: getValues("state"),
            country: getValues("country"),
            postalCode: getValues("postalCode"),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <Label>Address Type</Label>
                <Select
                    value={watch("addressType")}
                    onValueChange={(value) => setValue("addressType", value)}
                >
                    <SelectTrigger className="w-full min-h-[50px]">
                        <SelectValue placeholder="Select Address Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="primary">Primary</SelectItem>
                        <SelectItem value="secondary">Secondary</SelectItem>
                    </SelectContent>
                </Select>
                {errors.addressType && <p className="text-red-500 text-sm">{errors.addressType.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-2 space-y-2">
                <InputWithError
                    label="Postal Code"
                    placeholder="Postal Code"
                    className="py-0 px-4 w-full min-h-[50px]"
                    {...register("postalCode")}
                    error={errors.postalCode?.message}
                />
                <InputWithError
                    label="Street Address"
                    placeholder="Street Address"
                    className="py-0 px-4 w-full min-h-[50px]"
                    {...register("address")}
                    error={errors.address?.message}
                />
                <InputWithError
                    label="City"
                    placeholder="City"
                    className="py-0 px-4 w-full min-h-[50px]"
                    {...register("city")}
                    error={errors.city?.message}
                />
                <InputWithError
                    label="State"
                    placeholder="State"
                    disabled={isDisabled}
                    className="py-0 px-4 w-full min-h-[50px]"
                    {...register("state")}
                    error={errors.state?.message}
                />
                <InputWithError
                    label="Country"
                    placeholder="Country"
                    className="py-0 px-4 w-full min-h-[50px]"
                    {...register("country")}
                    disabled={isDisabled}
                    error={errors.country?.message}
                />
            </div>
            <ButtonWithLoading
                isLoading={isLoading}
                type="submit"
                className="mt-4 py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right min-w-[100px]"
            >
                Save
            </ButtonWithLoading>
        </form>
    );
};


export default LocationFormInput;
