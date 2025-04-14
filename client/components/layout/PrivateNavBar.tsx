"use client";

import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "./PrivateSideBar";
import DropdownNavItem from "./DropDownNavItem";
import ActionIcon from "./NavBarActionIcon";
import { ATS_ITEMS, EMS_ITEMS, HISTORY_ITEMS, TOOLS_ITEMS } from "@/constants/nav";
import useIsPublicRoutes from "@/hooks/useIsPublicRoutes";
import useAuth from "@/hooks/states/useAuth";
import ConfirmLogoutDialog from "@/components/common/ConfirmLogoutDialog";
const PrivateNavBar = () => {
    const { userToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const isPublicRoute = useIsPublicRoutes();
    const [openDropdown, setOpenDropdown] = useState<"ATS" | "EMS" | "CALENDAR" | "HISTORY" | "TOOLS" | null>(null);
    const [isConfirmLogoutOpen, setIsConfirmLogoutOpen] = useState(false);
    const handleLogout = () => {
        setIsConfirmLogoutOpen(true);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return null;
    if (isPublicRoute || !userToken) return null;

    const handleCloseDropdown = () => {
        setOpenDropdown(null);
    };

    const handleOpenDropdown = (dropdown: "ATS" | "EMS" | "CALENDAR" | "HISTORY" | "TOOLS") => {
        setOpenDropdown(dropdown);
    };


    return (
        <>
            <SidebarProvider>
                <header className="fixed top-0 left-0 right-0 z-40 bg-[#111836] text-white shadow-md">
                    <div className="w-full">
                        <div className="flex items-center justify-between h-16 md:h-22">
                            {/* Logo and mobile menu button */}
                            <div className="flex items-center pl-4 sm:pl-2">
                                {/* Mobile menu button */}
                                <div className="mr-4 header:hidden block">
                                    <SidebarTrigger />
                                </div>

                                {/* Logo */}
                                <div className="header:block hidden">
                                    <Link href="/">
                                        <Image
                                            src="/assets/images/logo.svg"
                                            alt="Hire and Retain Logo"
                                            width={100}
                                            height={69.9}
                                        />
                                    </Link>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="flex items-center">
                                <nav className="hidden header:flex space-x-4 items-center mx-auto text-base sm:text-lg justify-center mr-10">
                                    <DropdownNavItem
                                        icon={<i className="fas fa-list-alt"></i>}
                                        label="ATS"
                                        isOpen={openDropdown === "ATS"}
                                        setIsOpen={handleOpenDropdown}
                                        onClose={handleCloseDropdown}
                                        items={ATS_ITEMS}
                                    />
                                    <DropdownNavItem
                                        icon={<i className="fas fa-users"></i>}
                                        label="EMS"
                                        isOpen={openDropdown === "EMS"}
                                        setIsOpen={handleOpenDropdown}
                                        onClose={handleCloseDropdown}
                                        items={EMS_ITEMS}
                                    />
                                    <DropdownNavItem
                                        icon={<i className="fas fa-calendar"></i>}
                                        label="CALENDAR"
                                        isOpen={openDropdown === "CALENDAR"}
                                        setIsOpen={handleOpenDropdown}
                                        onClose={handleCloseDropdown}
                                        items={HISTORY_ITEMS}
                                    />
                                    <Link href="/calendar" prefetch={false} className="flex items-center px-2text-xs sm:text-sm font-medium cursor-pointer hover:bg-[#1a2847] rounded-md">
                                        <i className="fas fa-briefcase"></i>
                                        <span className="ml-2">CALENDAR</span>
                                    </Link>
                                    <DropdownNavItem
                                        icon={<i className="fas fa-list-alt"></i>}
                                        label="HISTORY"
                                        isOpen={openDropdown === "HISTORY"}
                                        setIsOpen={handleOpenDropdown}
                                        onClose={handleCloseDropdown}
                                        items={HISTORY_ITEMS}
                                    />
                                    <DropdownNavItem
                                        icon={<i className="fas fa-archive"></i>}
                                        label="TOOLS"
                                        isOpen={openDropdown === "TOOLS"}
                                        setIsOpen={handleOpenDropdown}
                                        onClose={handleCloseDropdown}
                                        items={TOOLS_ITEMS}
                                    />
                                </nav>

                                {/* User and Action Icons */}
                                <div className="flex items-center pr-4 sm:pr-2">
                                    <Link href={'/user-profile'} className="flex items-center mr-4 cursor-pointer">
                                        <div className="flex items-center space-x-2 text-xs sm:text-sm">
                                            <div className="rounded-full h-8 w-8 flex items-center justify-center">
                                                <Image
                                                    src="/assets/images/user-placeholder.jpg"
                                                    alt="User Icon"
                                                    width={28}
                                                    height={28}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <span className="text-xs sm:text-sm font-medium cursor-pointer">Minimal Access</span>
                                        </div>
                                    </Link>
                                    <div className="flex items-center space-x-2">
                                        <ActionIcon
                                            link="/help"
                                            icon={
                                                <Image
                                                    src="/assets/icons/help.svg"
                                                    className="max-h-[20px]"
                                                    alt="Help"
                                                    width={20}
                                                    height={20}
                                                />
                                            }
                                        />
                                        <ActionIcon
                                            link="/emails"
                                            icon={<Mail className="h-5 w-5" />}
                                        />
                                        <ActionIcon
                                            link="/chat"
                                            icon={
                                                <Image
                                                    src="/assets/icons/chat.svg"
                                                    alt="Chat"
                                                    width={20}
                                                    height={20}
                                                />
                                            } />
                                        <button
                                            className="p-1 sm:p-2 rounded-full bg-white text-[#111836] hover:bg-gray-200 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            <Image
                                                src="/assets/icons/leave.svg"
                                                alt="Leave"
                                                width={20}
                                                height={20}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </SidebarProvider>
            <ConfirmLogoutDialog
                isOpen={isConfirmLogoutOpen}
                onOpenChange={setIsConfirmLogoutOpen}
            />
        </>
    );
};

export default memo(PrivateNavBar);


