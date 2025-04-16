import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormSetError,
  useWatch,
  Control,
} from "react-hook-form";
import { SignupSchemaType } from "@/lib/schema";
import InputWithError from "@/components/form-components/InputWithError";
import { useEffect, useState } from "react";
import { getLocationByPostalCode } from "@/lib/api/publicRoutes";
import useIsLoading from "@/hooks/states/useIsLoading";

type AddressInputsProps = {
  register: UseFormRegister<SignupSchemaType>;
  errors: FieldErrors<SignupSchemaType>;
  setValue: UseFormSetValue<SignupSchemaType>;
  setError: UseFormSetError<SignupSchemaType>;
  control: Control<SignupSchemaType>;
  variant?: "xs" | "sm" | "md" | "lg";
};

const AddressInputs = ({
  register,
  errors,
  setValue,
  setError,
  control,
  variant = "md",
}: AddressInputsProps) => {
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
        variant={variant}
        {...register("postalCode")}
      />
      <InputWithError
        label="Address"
        error={errors.address?.message}
        placeholder="Address"
        variant={variant}
        {...register("address")}
      />
      <InputWithError
        label="City"
        error={errors.city?.message}
        placeholder="City"
        variant={variant}
        {...register("city")}
      />
      <InputWithError
        label="State"
        error={errors.state?.message}
        placeholder="State"
        variant={variant}
        {...register("state")}
        disabled={isDisabled}
      />
      <InputWithError
        label="Country"
        error={errors.country?.message}
        placeholder="Country"
        variant={variant}
        {...register("country")}
        disabled={isDisabled}
      />
    </>
  );
};

export default AddressInputs;
