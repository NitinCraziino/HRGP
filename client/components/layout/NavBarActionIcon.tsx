import Link from "next/link";
import useAuth from "@/hooks/states/useAuth";
import { useRouter } from "next/navigation";

const NavBarActionIcon = ({ icon, link }: { icon: React.ReactNode; link: string; }) => {
    const { logout } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        logout();
        setTimeout(() => {
            router.push("/signin");
        }, 0);
    };
    if (link === '/logout') {
        return (
            <button
                className="p-1 sm:p-2 rounded-full bg-white text-[#111836] hover:bg-gray-200"
                onClick={handleLogout}
            >
                {icon}
            </button>
        );
    }
    return (
        <Link href={link} prefetch={false}>
            <button className="p-1 sm:p-2 rounded-full bg-white text-[#111836] hover:bg-gray-200">
                {icon}
            </button>
        </Link>
    );
};

export default NavBarActionIcon;
