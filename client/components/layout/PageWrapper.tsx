const PageWrapper = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className="pt-[90px] max-w-6xl mx-auto">
            {children}
        </div>
    );
};

export default PageWrapper;