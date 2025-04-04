"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    ChevronDown,
    Menu,
    Home,
    Users,
    Briefcase,
    LineChart,
    Settings,
    FileText,
    Bell
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SidebarItemProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    hasDropdown?: boolean;
    expanded?: boolean;
    onClick?: () => void;
};

const SidebarItem = ({
    icon,
    label,
    active = false,
    hasDropdown = false,
    expanded = false,
    onClick
}: SidebarItemProps) => {
    return (
        <div
            className={cn(
                "flex items-center justify-between px-4 py-3 cursor-pointer rounded-md transition-colors",
                active ? "bg-[#1a2847] text-white" : "hover:bg-[#1a2847] text-gray-300"
            )}
            onClick={onClick}
        >
            <div className="flex items-center">
                {icon}
                <span className="ml-3 font-medium">{label}</span>
            </div>
            {hasDropdown && (
                <ChevronDown
                    className={cn(
                        "h-4 w-4 transition-transform",
                        expanded ? "transform rotate-180" : ""
                    )}
                />
            )}
        </div>
    );
};

// Create a context to share the sheet state
const SidebarContext = React.createContext<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    open: false,
    setOpen: () => { },
});

export function SidebarProvider({ children }: { children: React.ReactNode; }) {
    const [open, setOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleItem = (key: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="p-0 bg-[#111836] border-r border-[#1a2847] overflow-hidden">
                    <SheetTitle className="hidden" />
                    <SheetDescription className="hidden" />
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-[#1a2847]">
                            <Link href="/">
                                <Image
                                    src="/assets/images/hrgp-logo.png"
                                    alt="Hire and Retain Logo"
                                    width={100}
                                    height={61.9}
                                    className="h-auto"
                                />
                            </Link>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="py-4 space-y-1">
                                <SidebarItem
                                    icon={<Home className="h-5 w-5" />}
                                    label="Dashboard"
                                    active
                                />
                                <SidebarItem
                                    icon={<Briefcase className="h-5 w-5" />}
                                    label="ATS"
                                    hasDropdown
                                    expanded={expandedItems["ats"]}
                                    onClick={() => toggleItem("ats")}
                                />
                                {expandedItems["ats"] && (
                                    <div className="ml-8 space-y-1 mt-1">
                                        <SidebarItem icon={<FileText className="h-4 w-4" />} label="Applications" />
                                        <SidebarItem icon={<Users className="h-4 w-4" />} label="Candidates" />
                                    </div>
                                )}
                                <SidebarItem
                                    icon={<Users className="h-5 w-5" />}
                                    label="EMS"
                                    hasDropdown
                                    expanded={expandedItems["ems"]}
                                    onClick={() => toggleItem("ems")}
                                />
                                <SidebarItem
                                    icon={<Bell className="h-5 w-5" />}
                                    label="CALENDAR"
                                />
                                <SidebarItem
                                    icon={<LineChart className="h-5 w-5" />}
                                    label="HISTORY"
                                    hasDropdown
                                    expanded={expandedItems["history"]}
                                    onClick={() => toggleItem("history")}
                                />
                                <SidebarItem
                                    icon={<Settings className="h-5 w-5" />}
                                    label="TOOLS"
                                    hasDropdown
                                    expanded={expandedItems["tools"]}
                                    onClick={() => toggleItem("tools")}
                                />
                            </div>
                        </ScrollArea>
                    </div>
                </SheetContent>
                {children}
            </Sheet>
        </SidebarContext.Provider>
    );
}

// Export the SidebarTrigger component
export function SidebarTrigger() {
    const { setOpen } = React.useContext(SidebarContext);

    return (
        <SheetTrigger asChild>
            <button
                className="bg-[#5046e5] text-white p-2 rounded-md"
                onClick={() => setOpen(true)}
            >
                <Menu className="h-6 w-6" />
            </button>
        </SheetTrigger>
    );
}