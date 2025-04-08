"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Link from "next/link";
import { APPLICATION_LINKS } from "@/constants/nav";
import useIsPublicRoutes from "@/hooks/useIsPublicRoutes";

interface PageHeaderProps {
    title?: string;
    customBreadcrumbs?: Array<{
        label: string;
        path: string;
    }>;
    showBreadcrumbs?: boolean;
}

const PageHeader = ({
    title,
    customBreadcrumbs,
    showBreadcrumbs = true
}: PageHeaderProps) => {
    const pathname = usePathname();
    const isPublicPage = useIsPublicRoutes();

    if (isPublicPage) {
        return null;
    }

    const breadcrumbItems = useMemo(() => {
        // If custom breadcrumbs are provided, use those
        if (customBreadcrumbs) {
            return customBreadcrumbs;
        }

        const items = [{ label: "Home", path: "/" }];

        // Remove trailing slash and get current path segments
        const currentPath = pathname.replace(/\/$/, '');

        // Find matching route from APPLICATION_LINKS
        const matchingRoute = APPLICATION_LINKS.find(route =>
            route.link === currentPath || currentPath.startsWith(route.link + '/')
        );

        if (matchingRoute) {
            // Split the matching route path to create intermediate breadcrumbs
            const routeSegments = matchingRoute.link.split('/').filter(Boolean);
            let accumulatedPath = "";

            routeSegments.forEach((segment) => {
                accumulatedPath += `/${segment}`;
                // Find the label from APPLICATION_LINKS if it exists
                const matchingLink = APPLICATION_LINKS.find(link => link.link === accumulatedPath);
                const label = matchingLink ? matchingLink.label :
                    segment
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');

                items.push({ label, path: accumulatedPath });
            });

            // Add any additional segments after the matching route
            const remainingPath = currentPath.slice(matchingRoute.link.length);
            if (remainingPath) {
                const additionalSegments = remainingPath.split('/').filter(Boolean);
                let currentAdditionalPath = matchingRoute.link;

                additionalSegments.forEach(segment => {
                    currentAdditionalPath += `/${segment}`;
                    const label = segment
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    items.push({ label, path: currentAdditionalPath });
                });
            }
        } else {
            // Fallback for paths not in APPLICATION_LINKS
            const pathSegments = currentPath.split('/').filter(Boolean);
            let accumulatedPath = "";

            pathSegments.forEach((segment) => {
                accumulatedPath += `/${segment}`;
                const label = segment
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                items.push({ label, path: accumulatedPath });
            });
        }

        return items;
    }, [pathname, customBreadcrumbs]);

    // If no title is provided, use the last breadcrumb item's label
    const pageTitle = title || (breadcrumbItems.length > 0 ? breadcrumbItems[breadcrumbItems.length - 1].label : "");

    return (
        <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 bg-white pt-[70px] sm:pt-24 px-5">
            <h1 className="text-2xl font-bold">{pageTitle}</h1>

            {showBreadcrumbs && (
                <div className="flex items-center text-gray-500 text-sm">
                    {breadcrumbItems.map((item, index) => (
                        <div key={item.path} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-gray-400">/</span>
                            )}
                            <Link
                                href={item.path}
                                className={`hover:text-gray-800 ${index === breadcrumbItems.length - 1
                                    ? "text-indigo-600 font-medium"
                                    : ""
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default PageHeader;