import Link from "next/link";

const ActionIcon = ({ icon, link }: { icon: React.ReactNode; link: string; }) => {
    const handleLogout = () => {
        console.log('logout');
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

export default ActionIcon;
