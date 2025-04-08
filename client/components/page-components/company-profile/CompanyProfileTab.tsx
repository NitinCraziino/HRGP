'use client';
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Copy, Check } from "lucide-react";
import { useState } from "react";
import LocationsSection from "./LocationsSection";
import { InputWithError } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";

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

const companyProfileFormSchema = z.object({
    companyName: z.string().min(1, { message: "Company Name is required" }),
    industry: z.string().min(1, { message: "Industry is required" }),
    aboutUs: z.string().min(1, { message: "About Us is required" }),
    companyType: z.string().min(1, { message: "Company Type is required" }),
    companyUrl: z.string().min(1, { message: "Company URL is required" }),
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
                        <Select
                            disabled={!isEditing}
                            value={watch("industry")}
                            onValueChange={(value) => setValue("industry", value)}
                        >
                            <SelectTrigger className="w-full min-h-[50px]">
                                <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                            <SelectContent>
                                {INDUSTRY_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            disabled={!isEditing}
                            value={watch("companyType")}
                            onValueChange={(value) => {
                                setValue("companyType", value);
                                console.log('companyType', value);

                            }}
                        >
                            <SelectTrigger id="companyType" className="w-full min-h-[50px]">
                                <SelectValue placeholder="Select Company Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {COMPANY_TYPE_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Company Profile */}
                    <div className="mb-6 text-lg ">
                        <h3 className="text-sm font-semibold mb-2">Company Profile</h3>
                        <div className="flex flex-col space-y-2 min-h-[50px]">
                            <div className="flex items-center text-gray-600">
                                <span>https://hrgp.io/app/company/</span>
                                <div className="flex-1 ml-2">
                                    <InputWithError
                                        {...register("companyUrl")}
                                        error={errors.companyUrl?.message}
                                        placeholder="Enter Company Public URL"
                                        disabled={!isEditing}
                                        className={`${!isEditing ? 'bg-gray-50 min-h-[50px] cursor-not-allowed border-gray-200' : ''} py-1 px-2 h-8`}
                                    />
                                </div>
                                <Button
                                    variant="secondary"
                                    type="button"
                                    size="sm"
                                    className="bg-teal-600 text-white hover:bg-teal-700 ml-2"
                                    onClick={() => navigator.clipboard.writeText(`https://hrgp.io/app/company/${getValues("companyUrl")}`)}
                                >
                                    <Copy className="h-4 w-4 mr-1" />
                                    Copy
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* About Us */}
                    <div className="mb-6">
                        <InputWithError
                            label="About Us"
                            {...register("aboutUs")}
                            disabled={!isEditing}
                            error={errors.aboutUs?.message}
                            className={`${!isEditing ? 'bg-gray-50 cursor-not-allowed border-gray-200' : ''}`}
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
