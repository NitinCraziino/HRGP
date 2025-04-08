'use client';

import PrivateContainer from "@/components/hoc/PrivateContainer";
import ProfileBannerSection from '@/components/common/ProfileBannerSection';
import { useState } from "react";
import AboutSection from "@/components/page-components/user-profile/AboutSection";
import EmailSection from "@/components/page-components/user-profile/EmailSection";
import PhoneSection from "@/components/page-components/user-profile/PhoneSection";

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
        <>
            <PrivateContainer className="flex flex-col">
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
                        emails={[
                            "john.doe@example.com",
                            "john.doe@example.com",
                            "john.doe@example.com",
                        ]}
                    />
                    <PhoneSection />
                </div>

            </PrivateContainer>
        </>
    );
};

export default UserProfilePage;