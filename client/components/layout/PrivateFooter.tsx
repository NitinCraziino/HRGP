import { memo } from "react";

const PrivateFooter = () => {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <footer className="w-full text-sm pl-10 bg-white py-2">
            © {year} All rights reserved.
        </footer>
    );
};

export default memo(PrivateFooter);