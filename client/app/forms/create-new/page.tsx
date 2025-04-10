'use client';

import SelectWithSearch from "@/components/form-components/SelectWithSearch";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import { Checkbox } from "@/components/ui/checkbox";
import InputWithError from "@/components/form-components/InputWithError";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const formTypes = [
    {
        value: "quiz",
        label: "Quiz"
    },
    {
        value: "survey",
        label: "Survey"
    },
    {
        value: "interview",
        label: "Interview"
    },
    {
        value: "application",
        label: "Application"
    }
];

const page = () => {
    const [includeCompanyLogo, setIncludeCompanyLogo] = useState(false);
    const [formType, setFormType] = useState("quiz");
    const [formTitle, setFormTitle] = useState("");
    return (
        <PrivateContainer>
            <div className="p-6 space-y-6 bg-white rounded-lg">
                <h1 className="text-2xl font-bold">Add New Form</h1>
                <form className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <SelectWithSearch
                                options={formTypes}
                                onChange={(value) => setFormType(value)}
                                value={formType}
                                emptyIndicator="No form types found"
                                label="Select a form type"
                            />
                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox
                                    onChange={() => { }}
                                    checked={includeCompanyLogo}
                                />
                                <Label htmlFor="include-company-logo">Include Company Logo</Label>
                            </div>
                        </div>
                        <div>
                            <InputWithError
                                label="Form Title"
                                onChange={(e) => setFormTitle(e.target.value)}
                                value={formTitle}
                            />
                            <div className="flex items-center gap-2 mt-2">
                                <Checkbox
                                    onChange={() => { }}
                                    checked={includeCompanyLogo}
                                />
                                <Label htmlFor="use-timer">Use Timer (end minutes in box)</Label>
                                <InputWithError
                                    type="number"
                                    onChange={(e) => { }}
                                    value={0}

                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </PrivateContainer>
    );
};

export default page;