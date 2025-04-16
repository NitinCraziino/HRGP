"use client";

import type { FieldErrors, UseFormGetValues, UseFormRegister } from "react-hook-form";
import type { z } from "zod";
import type { companyProfileFormSchema } from "../page-components/company-profile/CompanyProfileTab";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
type UrlInputProps = {
  baseUrl: string;
  urlField: keyof z.infer<typeof companyProfileFormSchema>;
  isEditing?: boolean;
  register: UseFormRegister<z.infer<typeof companyProfileFormSchema>>;
  errors: FieldErrors<z.infer<typeof companyProfileFormSchema>>;
  getValues: UseFormGetValues<z.infer<typeof companyProfileFormSchema>>;
};

const UrlAliasInput = ({
  baseUrl,
  urlField,
  isEditing,
  register,
  errors,
  getValues,
}: UrlInputProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-2">Company Profile</h3>
      <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
        <div className="flex-shrink-0 px-3 py-2 text-gray-600 bg-white">{baseUrl}</div>
        <div className="flex-1">
          <input
            {...register(urlField)}
            placeholder="Enter Company Public URL"
            disabled={!isEditing}
            className={`w-full border-0 focus:ring-0 outline-none py-2 px-2 ${
              !isEditing ? "bg-gray-50 cursor-not-allowed text-gray-500" : ""
            }`}
          />
        </div>
        <Button
          variant="secondary"
          type="button"
          size="sm"
          className="h-full rounded-none bg-teal-600 text-white hover:bg-teal-700 px-4 py-2"
          onClick={() => navigator.clipboard.writeText(`${baseUrl}/${getValues(urlField)}`)}
        >
          Copy
          <CopyIcon className="h-4 w-4 ml-1" />
        </Button>
      </div>
      {errors[urlField]?.message && (
        <p className="text-sm text-red-500 mt-1">{errors[urlField]?.message as string}</p>
      )}
    </div>
  );
};

export default UrlAliasInput;
