'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import ProfileBannerSection from '@/components/common/ProfileBannerSection';
import CompanyProfileTab from "@/components/page-components/company-profile/CompanyProfileTab";
import CompanySettingsTab from "@/components/page-components/company-profile/CompanySettingsTab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const CompanyProfilePage = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);

    const handleProfileUpload = (file: File) => {
        setProfileImage(file);
    };

    const handleBannerUpload = (file: File) => {
        setBannerImage(file);
    };

    return (
        <>
            <ScrollArea className="h-screen">
                <PrivateContainer className="flex flex-col h-full">
                    <div className="flex-none">
                        <ProfileBannerSection
                            name="HRGP LLC"
                            description="Computer Software"
                            location="Sagamore Beach, Massachusetts, United States"
                            logo="/assets/images/hrgp-logo.png"
                            banner="/assets/images/banner-1.jpg"
                            handleProfileUpload={handleProfileUpload}
                            handleBannerUpload={handleBannerUpload}
                        />
                    </div>

                    {/* Tabs Section */}
                    <Tabs defaultValue="profile" className="w-full mt-12 flex flex-col flex-grow">
                        <div className="flex-none">
                            <TabsList className="border-b border-black rounded-none bg-transparent w-full justify-start">
                                <div className="pb-3">
                                    <TabsTrigger
                                        value="profile"
                                        className="px-4 py-2 mb-0 text-lg ring-0 rounded-none font-semibold text-gray-700 data-[state=active]:text-gray-950 bg-none data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:bg-transparent shadow-none"
                                    >
                                        Company Profile
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="settings"
                                        className="px-4 py-2 mb-0 text-lg ring-0 rounded-none font-semibold text-gray-700 data-[state=active]:text-gray-950 bg-none data-[state=active]:border-b-2 data-[state=active]:border-b-black data-[state=active]:bg-transparent shadow-none"
                                    >
                                        Company Settings
                                    </TabsTrigger>
                                </div>
                            </TabsList>
                        </div>

                        <div className="flex-grow overflow-auto">
                            <CompanyProfileTab />
                            <CompanySettingsTab />
                        </div>
                    </Tabs>
                </PrivateContainer>
            </ScrollArea>
        </>
    );
};

export default CompanyProfilePage;