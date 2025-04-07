'use client';

import { memo, useState } from 'react';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageUploadDialog from './ImageUploadDialog';

const BannerSection = () => {
    const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
    const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
    const [profileImage, setProfileImage] = useState("/assets/images/hrgp-logo.png");
    const [bannerImage, setBannerImage] = useState("/assets/images/banner-1.jpg");


    const handleProfileUpload = (file: File) => {
        // In a real application, you would upload the file to your server
        // and then update the image URL after successful upload
        console.log("Uploading profile image:", file.name);

        // For demo purposes, create a local object URL
        const objectUrl = URL.createObjectURL(file);
        setProfileImage(objectUrl);
    };

    const handleBannerUpload = (file: File) => {
        console.log("Uploading banner image:", file.name);

        // For demo purposes, create a local object URL
        const objectUrl = URL.createObjectURL(file);
        setBannerImage(objectUrl);
    };

    return (
        <Card className="shadow-md max-w-6xl mx-auto border-0 overflow-hidden">
            {/* Cover Image Section with Edit Button */}
            <div className="relative">
                <div className="h-60 bg-blue-900 relative top-0">
                    <Image
                        src="/assets/images/banner-1.jpg"
                        alt="Company Cover"
                        className="w-full h-full object-cover"
                        width={1200}
                        height={300}
                    />

                    {/* Edit Cover Button */}
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-4 right-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full h-8 w-8 p-0"
                        onClick={() => setIsBannerDialogOpen(true)}
                    >
                        <Pencil size={18} />
                    </Button>
                </div>

                {/* Logo Overlay */}
                <div className="absolute -bottom-10 left-8">
                    <div className="relative">
                        <Avatar className="h-40 w-40 border-4 border-white bg-white">
                            <AvatarImage
                                src="/assets/images/hrgp-logo.png"
                                alt="Company Logo"
                            />
                            <AvatarFallback>HRGP</AvatarFallback>
                        </Avatar>

                        {/* Edit Logo Button */}
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute bottom-5 right-0 bg-teal-500 hover:bg-teal-600 text-white rounded-full h-10 w-10 p-0"
                            onClick={() => setIsProfileDialogOpen(true)}
                        >
                            <i className="fas fa-pencil-alt text-lg" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Company Info Section */}
            <div className=" pl-60">
                <h1 className="text-2xl font-medium text-blue-950">HRGP LLC</h1>
                <p className="text-gray-400 text-sm mt-1">Computer Software</p>
                <p className="text-gray-600 text-sm mt-1">
                    Sagamore Beach, Massachusetts, United States
                </p>
            </div>

            <ImageUploadDialog
                isOpen={isProfileDialogOpen}
                onClose={() => setIsProfileDialogOpen(false)}
                onUpload={handleProfileUpload}
                title="Upload Profile Image"
                dimensions="200 x 200"
                maxFileSize={5}
            />
            <ImageUploadDialog
                isOpen={isBannerDialogOpen}
                onClose={() => setIsBannerDialogOpen(false)}
                onUpload={handleBannerUpload}
                title="Upload Banner Image"
                dimensions="2800 x 800"
                maxFileSize={5}
            />

        </Card>
    );
};

export default memo(BannerSection);
