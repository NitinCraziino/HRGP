import { memo } from "react";

const PrivateFooter = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="fixed bottom-0 w-full h-10 text-sm pl-10 bg-white py-2">
            © {year} All rights reserved.
        </footer>
    );
};

export default memo(PrivateFooter);