import Link from "next/link";
import { memo } from "react";

const NavBarActionIcon = ({ icon, link }: { icon: React.ReactNode; link: string; }) => (
    <Link href={link} prefetch={false}>
        <button className="p-1 sm:p-2 rounded-full bg-white text-[#111836] hover:bg-gray-200 cursor-pointer">
            {icon}
        </button>
    </Link>
);

export default memo(NavBarActionIcon);
