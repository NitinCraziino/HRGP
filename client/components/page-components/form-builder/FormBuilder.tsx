'use client';

import useFormBuilder from "@/hooks/states/useFormBuilder";

const FormBuilder = () => {
    const { form } = useFormBuilder();

    if (!form) {
        return null;
    }

    return (
        <div>
            Form Builder
        </div>
    );
};

export default FormBuilder;