import { create } from "zustand";

type Form = {
    formId: string;
    companyId: string;
    logoUrl?: string,
    formUrl?: string;
    timer?: number | null;
    active: boolean;
    deleted: boolean;
    title: string;
    category: string;
    formData?: {};
};

type FormBuilderStates = {
    form: Form | null;
    isTitleSubmitted?: boolean;
    timer?: {
        isTimerAdded: boolean;
        time: number;
    };
    title?: string;
    category?: string;
    includeCompanyLogo?: boolean;

    setIsTitleSubmitted: (value: boolean) => void;
    setTimer: (timer: { isTimerAdded: boolean; time: number; }) => void;
    setTitle: (title: string) => void;
    setCategory: (category: string) => void;
    setIncludeCompanyLogo: (value: boolean) => void;
    setForm: (form: Form) => void;
};

const useFormBuilder = create<FormBuilderStates>((set) => ({
    form: null,
    isTitleSubmitted: false,
    timer: {
        isTimerAdded: false,
        time: 0
    },
    title: "",
    category: "",
    includeCompanyLogo: false,
    setIsTitleSubmitted: (value) => set({ isTitleSubmitted: value }),
    setTimer: (timer) => set({ timer }),
    setTitle: (title) => set({ title }),
    setCategory: (category) => set({ category }),
    setIncludeCompanyLogo: (value) => set({ includeCompanyLogo: value }),
    setForm: (form) => set({ form })
}));

export default useFormBuilder;
