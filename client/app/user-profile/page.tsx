'use client';

import PrivateContainer from "@/components/hoc/PrivateContainer";
import ProfileBannerSection from '@/components/common/ProfileBannerSection';
import { useState } from "react";
import AboutSection from "@/components/page-components/user-profile/AboutSection";
import EmailSection from "@/components/page-components/user-profile/EmailSection";
import PhoneSection from "@/components/page-components/user-profile/PhoneSection";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserProfilePage = () => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [bannerImage, setBannerImage] = useState<File | null>(null);

    const handleProfileUpload = (file: File) => {
        setProfileImage(file);
    };

    const handleBannerUpload = (file: File) => {
        setBannerImage(file);
    };

    return (
        <ScrollArea className="h-screen">
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

                <div className="w-full mt-12 flex flex-col flex-grow space-y-5">
                    <AboutSection
                        firstName="John"
                        lastName="Doe"
                        position="Software Engineer"
                        startDate="2020-01-01"
                    />
                    <EmailSection
                        initialEmails={[
                            { address: "john.doe@example.com", isPrimary: true },
                            { address: "john.doe@example.com", isPrimary: false },
                            { address: "john.doe@example.com", isPrimary: false },
                        ]}
                    />
                    <PhoneSection
                        initialPhones={[
                            { phone: "+1234567890", isPrimary: true },
                            { phone: "+1234567890", isPrimary: false },
                            { phone: "+1234567890", isPrimary: false },
                        ]}
                    />
                </div>

            </PrivateContainer>
        </ScrollArea>
    );
};

export default UserProfilePage;