'use client';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import LocationsSection from "./LocationsSection";
import InputWithError from "@/components/form-components/InputWithError";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import UrlAliasInput from "@/components/form-components/UrlAliasInput";
import SelectWithSearch from "@/components/form-components/SelectWithSearch";
import TextareaWithError from "@/components/form-components/TextAreaWithError";

const INDUSTRY_OPTIONS = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
];

const COMPANY_TYPE_OPTIONS = [
    { value: "company", label: "Company" },
    { value: "individual", label: "Individual" },
    { value: "non-profit", label: "Non-Profit" },
];

export const companyProfileFormSchema = z.object({
    companyName: z.string().min(1, { message: "Company Name is required" }),
    industry: z.string().min(1, { message: "Industry is required" }),
    aboutUs: z.string().min(1, { message: "About Us is required" }),
    companyType: z.string().min(1, { message: "Company Type is required" }),
    companyUrl: z.string().min(1, { message: "Company URL is required" }),
    jobOpeningsUrl: z.string().min(1, { message: "Job Openings URL is required" }),
});

const CompanyProfileTab = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Handle toggling of edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
        setValue,
        watch,
    } = useForm<z.infer<typeof companyProfileFormSchema>>({
        resolver: zodResolver(companyProfileFormSchema),
        defaultValues: {
            companyName: "HRGP",
            industry: "technology",
            aboutUs: "We are a company that provides HR solutions to businesses.",
            companyType: "company",
            companyUrl: "hrgp",
            jobOpeningsUrl: "hrgp"
        },
    });

    const onSubmit = (data: z.infer<typeof companyProfileFormSchema>) => {
        console.log('submitting data', data);
    };

    return (
        <TabsContent value="profile" className="mt-6">
            <Card className="border rounded-md shadow-sm p-6">
                <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* Overview Section */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Overview</h2>
                        <Button variant="ghost" type="button" size="icon" onClick={toggleEdit}>
                            {isEditing ? (
                                <Check className="h-5 w-5" />
                            ) : (
                                <Pencil className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    {/* About Us */}
                    <div className="mb-6">
                        <InputWithError
                            label="Company Name"
                            disabled={!isEditing}
                            error={errors.companyName?.message}
                            className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed border-gray-200' : ''}`}
                            {...register("companyName")}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <SelectWithSearch
                            options={COMPANY_TYPE_OPTIONS}
                            value={watch("companyType")}
                            label="Company Type"
                            onChange={(value) => setValue("companyType", value)}
                            disabled={!isEditing}
                        />

                        <SelectWithSearch
                            options={INDUSTRY_OPTIONS}
                            value={watch("industry")}
                            label="Industry"
                            onChange={(value) => setValue("industry", value)}
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Company Profile */}
                    <UrlAliasInput
                        baseUrl="https://hrgp.io/app/company"
                        urlField="jobOpeningsUrl"
                        isEditing={isEditing}
                        register={register}
                        errors={errors}
                        getValues={getValues}
                    />

                    <UrlAliasInput
                        baseUrl="https://hrgp.io/app/company"
                        urlField="companyUrl"
                        isEditing={isEditing}
                        register={register}
                        errors={errors}
                        getValues={getValues}
                    />
                    {/* About Us */}
                    <div className="mb-6">
                        <TextareaWithError
                            label="About Us"
                            {...register("aboutUs")}
                            disabled={!isEditing}
                            error={errors.aboutUs?.message}
                            className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed border-gray-200 max-h-[100px]' : ''}`}
                        />
                    </div>

                    {isEditing && (
                        <ButtonWithLoading
                            isLoading={isSubmitting}
                            type="submit"
                            className="mt-4 py-2 px-8 rounded bg-[#5d45f8] hover:bg-[#4a35d9] text-sm float-right min-w-[100px]"
                        >
                            Save
                        </ButtonWithLoading>
                    )}

                </form>
                <LocationsSection />
            </Card>
        </TabsContent>
    );
};

export default CompanyProfileTab;
