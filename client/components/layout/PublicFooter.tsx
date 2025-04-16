"use client";

import Link from "next/link";
import React from "react";
import useIsPublicRoutes from "@/hooks/useIsPublicRoutes";

const PublicFooter = () => {
  const isPublicRoute = useIsPublicRoutes();
  if (!isPublicRoute) return null;
  return (
    <footer className="border-t py-2 px-4 md:px-6 bg-white mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 text-center">
        <div className="mb-1 md:mb-0">
          © 2008 - 2023 All rights reserved. | Guided Hiring® is a registered trademark of Hire
          and Retain Good People LLC
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 mt-1 md:mt-0">
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
