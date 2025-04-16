"use client";

import { memo, useState } from "react";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageUploadDialog from "@/components/common/ImageUploadDialog";

type BannerSectionProps = {
  name: string;
  description: string;
  location?: string;
  logo: string;
  banner: string;
  handleProfileUpload: (file: File) => void;
  handleBannerUpload: (file: File) => void;
};

const BannerSection = ({
  name,
  description,
  location,
  logo,
  banner,
  handleProfileUpload,
  handleBannerUpload,
}: BannerSectionProps) => {
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);

  return (
    <Card className="shadow-md max-w-6xl mx-auto border-0 overflow-hidden">
      {/* Cover Image Section with Edit Button */}
      <div className="relative top-0">
        <div className="h-60 bg-blue-900 relative -top-6">
          <Image
            src={banner}
            alt="Company Cover"
            className="w-full h-auto max-h-72 object-cover"
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
              <AvatarImage src={logo} alt="Company Logo" />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
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
      <div className="pl-60 mt-5">
        <h1 className="text-2xl font-medium text-blue-950">{name}</h1>
        <p className="text-gray-400 text-sm mt-1">{description}</p>
        {location && <p className="text-gray-600 text-sm mt-1">{location}</p>}
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
