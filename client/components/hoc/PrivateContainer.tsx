import { WrapperProps } from "@/types/props";

const PrivateContainer = ({ children }: WrapperProps) => {
    return (
        <main className="min-h-screen bg-[#E9E9F3] pt-24">
            {children}
        </main>
    );
};

export default PrivateContainer;