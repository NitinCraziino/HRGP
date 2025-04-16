"use client";

import SelectWithSearch from "@/components/form-components/SelectWithSearch";
import { Checkbox } from "@/components/ui/checkbox";
import InputWithError from "@/components/form-components/InputWithError";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ButtonWithLoading from "@/components/common/ButtonWithLoading";
import useFormBuilder from "@/hooks/states/useFormBuilder"; // Import the Zustand store

const formTypes = [
    { value: "Multi-Rater" },
    { value: "Quiz" },
    { value: "Pre-Screening" },
    { value: "Interviewing" },
    { value: "Screening" },
    { value: "Position Description" },
    { value: "Onboarding" },
];

const AddNewForm = () => {
    const {
        setTitle,
        setCategory,
        setTimer,
        setIncludeCompanyLogo,
        setForm,
        title,
        category,
        timer,
        includeCompanyLogo,
        form
    } = useFormBuilder();

    const handleTimerChange = (checked: boolean) => {
        setTimer({
            isTimerAdded: checked,
            time: checked ? timer?.time! : 0
        });
    };

    const handleFormTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleFormCategoryChange = (value: string) => {
        setCategory(value);
    };

    const handleCompanyLogoChange = (checked: boolean) => {
        setIncludeCompanyLogo(checked);
    };

    const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setTimer({
            isTimerAdded: timer?.isTimerAdded!,
            time: value
        });
    };

    const handleSubmit = () => {
        if (!category || !title) {
            // ! trhow error
            return;
        }
        // make api call and get the form
        setForm({
            active: true,
            category: category,
            companyId: "2323",
            deleted: false,
            formId: "23e",
            title: title,
            timer: timer?.isTimerAdded ? timer.time : null,
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">Add New Form</h1>
            <form className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <SelectWithSearch
                            options={formTypes}
                            onChange={handleFormCategoryChange}
                            value={category}
                            emptyIndicator="No form Category found"
                            placeholder="Form Category"
                            size="md"  // Ensure the size is set to "md" for consistency
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <Checkbox
                                checked={includeCompanyLogo}
                                onCheckedChange={handleCompanyLogoChange}
                            />
                            <Label htmlFor="include-company-logo">Include Company Logo</Label>
                        </div>
                    </div>
                    <div>
                        <InputWithError
                            placeholder="Form Title *"
                            labelClassName="mb-[14px]"
                            onChange={handleFormTitleChange}
                            value={title}
                            className="min-h-8 py-5"
                            variant="sm"
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <Checkbox
                                checked={timer?.isTimerAdded}
                                onCheckedChange={handleTimerChange} // Handle the timer checkbox change
                            />
                            <Label htmlFor="use-timer">Use Timer {timer?.isTimerAdded && ("(end minutes in box)")}</Label>
                            {timer?.isTimerAdded && (
                                <InputWithError
                                    type="number"
                                    className="max-w-16 m-0"
                                    onChange={handleTimerInputChange}
                                    value={timer.time}
                                    variant="xs"
                                    disabled={!timer.isTimerAdded}  // Disable the input when the timer is off
                                />
                            )}
                        </div>
                    </div>
                </div>
            </form>
            {!form && (
                <div className="flex justify-end space-x-2">
                    <ButtonWithLoading
                        isLoading={false}
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
                    >
                        Submit
                    </ButtonWithLoading>
                    <Button
                        type="button"
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md"
                    >
                        Back
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AddNewForm;
