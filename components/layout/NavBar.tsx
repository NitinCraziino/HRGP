'use client';
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();
    const showLinks = pathname !== '/signin';
    return (
        <header className="border-b py-4 px-4 md:px-8">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap">
                <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-start">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/assets/images/hrgp-logo.png"
                            alt="Hire and Retain Logo"
                            width={100}
                            height={61.9}
                        />
                    </Link>
                    {showLinks && (
                        <nav className="hidden md:flex items-center space-x-4 md:space-x-6">
                            <div className="relative group">
                                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600">
                                    ABOUT <ChevronDown className="h-4 w-4" />
                                </button>
                            </div>
                            <Link href="/blogs" className="text-gray-700 hover:text-blue-600">
                                BLOGS
                            </Link>
                            <Link href="/pricing" className="text-gray-700 hover:text-blue-600">
                                PRICING
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-blue-600">
                                CONTACT
                            </Link>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    );
};

export default NavBar;