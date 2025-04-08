"use client";

import { Button } from "@/components/ui/button";
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
    showItemCount?: boolean;
    className?: string;
}

const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    showItemCount = true,
    className = "",
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages || totalPages === 0;

    return (
        <div className={`p-4 flex justify-end text-sm text-gray-500 ${className}`}>
            <div className="flex items-center gap-4">
                {showItemCount && (
                    <span>
                        {totalItems > 0
                            ? `${startItem}-${endItem} of ${totalItems}`
                            : "0-0 of 0"}
                    </span>
                )}
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={isFirstPage}
                        onClick={() => onPageChange(1)}
                        className="h-6 w-6 p-0"
                        aria-label="First page"
                    >
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={isFirstPage}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="h-6 w-6 p-0"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={isLastPage}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="h-6 w-6 p-0"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        disabled={isLastPage}
                        onClick={() => onPageChange(totalPages)}
                        className="h-6 w-6 p-0"
                        aria-label="Last page"
                    >
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
