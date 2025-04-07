'use client';
import { useState } from 'react';  // Import useState to manage the checkbox state
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const companySettingsFormSchema = z.object({
    automatedJobCode: z.boolean(),
    sendTwilioOptInEmail: z.boolean(),
    resumeOptional: z.boolean(),
    jobCodeForm: z.string(),
    jobCodeFile: z.string(),
    jobCodeLink: z.string(),
    recruitForCustomers: z.boolean(),
});

const CompanySettingsTab = () => {
    const [isResumeOptional, setIsResumeOptional] = useState(false); // State to track Resume Optional checkbox

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof companySettingsFormSchema>>({
        resolver: zodResolver(companySettingsFormSchema),
        defaultValues: {
            automatedJobCode: false,
            sendTwilioOptInEmail: false,
            resumeOptional: false,
            jobCodeForm: "",
            jobCodeFile: "",
            jobCodeLink: "",
            recruitForCustomers: false,
        },
    });

    // Handle the change for Resume Optional checkbox
    const handleResumeOptionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsResumeOptional(e.target.checked);
    };

    const onSubmit = (data: z.infer<typeof companySettingsFormSchema>) => {
        console.log('submitting data', data);
    };

    return (
        <TabsContent value="settings" className="mt-6">
            <Card className="border rounded-md shadow-sm p-6">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="automated-job-code"
                            defaultChecked
                            {...register('automatedJobCode')}
                        />
                        <label htmlFor="automated-job-code" className="text-sm font-medium">
                            Automated Job Code
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="send-twilio"
                            {...register('sendTwilioOptInEmail')}
                        />
                        <label htmlFor="send-twilio" className="text-sm font-medium">
                            Send Twilio Opt-In Email
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="resume-optional"
                            defaultChecked={isResumeOptional}
                            onCheckedChange={e => setIsResumeOptional(e as boolean)}
                        />
                        <label htmlFor="resume-optional" className="text-sm font-medium">
                            Resume Optional
                        </label>

                        {/* Show the select dropdown if Resume Optional is checked */}
                        {isResumeOptional && (
                            <div className="ml-6">
                                <Select defaultValue="form">
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="form">Form</SelectItem>
                                        <SelectItem value="file">File</SelectItem>
                                        <SelectItem value="link">Link</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="recruit-for-customers"
                            {...register('recruitForCustomers')}
                        />
                        <label htmlFor="recruit-for-customers" className="text-sm font-medium">
                            Recruit For Customers
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                            Update
                        </Button>
                    </div>
                </form>
            </Card>
        </TabsContent>
    );
};

export default CompanySettingsTab;
