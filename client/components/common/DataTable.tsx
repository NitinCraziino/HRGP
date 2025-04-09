"use client";

import type React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import PaginationSection from "@/components/common/PaginationSection";
import { cn } from "@/lib/utils";

export type Column<T> = {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => React.ReactNode;
    className?: string;
};

export type ActionConfig<T> = {
    edit?: {
        onClick: (item: T) => void;
        isDisabled?: (item: T) => boolean;
        isHidden?: (item: T) => boolean;
    };
    delete?: {
        onClick: (item: T) => void;
        isDisabled?: (item: T) => boolean;
        isHidden?: (item: T) => boolean;
    };
    custom?: Array<{
        icon: React.ReactNode;
        onClick: (item: T) => void;
        isDisabled?: (item: T) => boolean;
        isHidden?: (item: T) => boolean;
        className?: string;
    }>;
};

export type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    actions?: ActionConfig<T>;
    keyExtractor: (item: T) => string | number;
    pagination?: {
        currentPage: number;
        totalItems: number;
        itemsPerPage: number;
        onPageChange: (page: number) => void;
    };
    className?: string;
    tableClassName?: string;
    headerClassName?: string;
    rowClassName?: (item: T) => string;
    emptyState?: React.ReactNode;
    isLoading?: boolean;
    error?: Error | string | any;
    errorComponent?: React.ReactNode;
    onRetry?: () => void;
};

export function DataTable<T>({
    data,
    columns,
    actions,
    keyExtractor,
    pagination,
    className,
    tableClassName,
    headerClassName,
    rowClassName,
    emptyState,
    isLoading,
    error,
    errorComponent,
    onRetry,
}: DataTableProps<T>) {
    const hasActions = actions && (actions.edit || actions.delete || (actions.custom && actions.custom.length > 0));

    // If there's an error, show the error state
    if (error) {
        return (
            <div className={cn("border rounded-none overflow-hidden", className)}>
                <div className="p-8 flex flex-col items-center justify-center text-center">
                    {errorComponent || (
                        <div className="space-y-4">
                            <div className="text-red-500 text-lg font-medium">Error loading data</div>
                            <div className="text-gray-600">
                                {typeof error === "string" ? error : error.response?.data?.message || "An unexpected error occurred"}
                            </div>
                            {onRetry && (
                                <Button
                                    onClick={onRetry}
                                    variant="outline"
                                    className="mt-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                                >
                                    Try Again
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={cn("border rounded-none overflow-hidden", className)}>
                <div className="overflow-x-auto">
                    <Table className={cn("w-full", tableClassName)}>
                        <TableHeader className={cn("bg-gray-200 hover:bg-gray-200", headerClassName)}>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableHead key={index} className={cn("p-4 font-medium text-gray-600", column.className)}>
                                        {column.header}
                                    </TableHead>
                                ))}
                                {hasActions && <TableHead className="p-4 font-medium text-gray-600 text-center">Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, rowIndex) => (
                                <TableRow key={rowIndex} className="border-t">
                                    {columns.map((_, colIndex) => (
                                        <TableCell key={colIndex} className="p-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell className="p-4">
                                            <div className="flex gap-2 justify-center">
                                                {actions?.edit && <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />}
                                                {actions?.delete && <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />}
                                                {actions?.custom &&
                                                    actions.custom.map((_, actionIndex) => (
                                                        <div key={actionIndex} className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                                                    ))}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }

    return (
        <div className={cn("border rounded-none overflow-hidden", className)}>
            <div className="overflow-x-auto">
                <Table className={cn("w-full", tableClassName)}>
                    <TableHeader className={cn("bg-gray-200 hover:bg-gray-200", headerClassName)}>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead key={index} className={cn("p-4 font-medium text-gray-600", column.className)}>
                                    {column.header}
                                </TableHead>
                            ))}
                            {hasActions && <TableHead className="p-4 font-medium text-gray-600 text-center">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (hasActions ? 1 : 0)} className="p-4 text-center">
                                    {emptyState || "No data found"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow key={keyExtractor(item)} className={cn("border-t", rowClassName && rowClassName(item))}>
                                    {columns.map((column, columnIndex) => (
                                        <TableCell key={columnIndex} className="p-4">
                                            {column.cell
                                                ? column.cell(item)
                                                : column.accessorKey
                                                    ? String(item[column.accessorKey] || "")
                                                    : ""}
                                        </TableCell>
                                    ))}
                                    {hasActions && (
                                        <TableCell className="p-4">
                                            <div className="flex gap-2 justify-center">
                                                {actions?.edit && (!actions.edit.isHidden || !actions.edit.isHidden?.(item)) && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8"
                                                        onClick={() => actions.edit?.onClick(item)}
                                                        disabled={actions.edit.isDisabled?.(item)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {actions?.delete && (!actions.delete.isHidden || !actions.delete.isHidden?.(item)) && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8"
                                                        onClick={() => actions.delete?.onClick(item)}
                                                        disabled={actions.delete.isDisabled?.(item)}
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                {actions?.custom &&
                                                    actions.custom.map(
                                                        (customAction, actionIndex) =>
                                                            (!customAction.isHidden || !customAction.isHidden?.(item)) && (
                                                                <Button
                                                                    key={actionIndex}
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className={cn(
                                                                        "bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8",
                                                                        customAction.className,
                                                                    )}
                                                                    onClick={() => customAction.onClick(item)}
                                                                    disabled={customAction.isDisabled?.(item)}
                                                                >
                                                                    {customAction.icon}
                                                                </Button>
                                                            ),
                                                    )}
                                            </div>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            {pagination && (
                <PaginationSection
                    currentPage={pagination.currentPage}
                    totalItems={pagination.totalItems}
                    itemsPerPage={pagination.itemsPerPage}
                    onPageChange={pagination.onPageChange}
                />
            )}
        </div>
    );
}
