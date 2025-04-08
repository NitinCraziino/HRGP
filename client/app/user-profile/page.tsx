'use client';

import PageHeader from '@/components/layout/PageHeader';
import PrivateContainer from "@/components/hoc/PrivateContainer";
import ProfileBannerSection from '@/components/common/ProfileBannerSection';
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
                <PageHeader title="Company Profile" />
                <PrivateContainer className="flex flex-col h-full">
                    <div className="flex-none">
                        <ProfileBannerSection
                            name="John Doe"
                            description="Software Engineer"
                            logo="/assets/images/user-placeholder.jpg"
                            banner="/assets/images/banner-2.jpg"
                            handleProfileUpload={handleProfileUpload}
                            handleBannerUpload={handleBannerUpload}
                        />
                    </div>

                </PrivateContainer>
            </ScrollArea>
        </>
    );
};

export default CompanyProfilePage;