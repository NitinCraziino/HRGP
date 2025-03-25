'use client';
import { useIsMobile } from "@/hooks/useMobile";
import { usePathname } from "next/navigation";
import { memo } from "react";

const Header = () => {
    const pathname = usePathname();
    const isMobile = useIsMobile();
    const showLinks = pathname.includes('/signin');
    return (
        <header className="bg-[#0f1941] h-auto py-2 text-white flex justify-center items-center px-4 text-center text-sm md:text-base">
            <div className="max-w-6xl w-full flex flex-col sm:justify-between  items-center">
                <div className="flex justify-between w-full py-1 text-xs sm:text-sm md:text-base">
                    <div className="">{!showLinks && !isMobile ? "ATS for Small/Micro Biz: 30-Day Free Trial, Save Big!" : " "}</div>
                    <div className="font-medium">Call or Text +1 508-216-0328</div>
                </div>
            </div>
        </header>
    );
};

export default memo(Header);