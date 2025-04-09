"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
}: DataTableProps<T>) {
    const hasActions = actions && (actions.edit || actions.delete || (actions.custom && actions.custom.length > 0));

    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    return (
        <div className={cn("border rounded-none overflow-hidden", className)}>
            <div className="overflow-x-auto">
                <Table className={cn("w-full", tableClassName)}>
                    <TableHeader className={cn("bg-gray-200 hover:bg-gray-200", headerClassName)}>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableHead
                                    key={index}
                                    className={cn("p-4 font-medium text-gray-600", column.className)}
                                >
                                    {column.header}
                                </TableHead>
                            ))}
                            {hasActions && (
                                <TableHead className="p-4 font-medium text-gray-600 text-center">
                                    Actions
                                </TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (hasActions ? 1 : 0)}
                                    className="p-4 text-center"
                                >
                                    {emptyState || "No data found"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => (
                                <TableRow
                                    key={keyExtractor(item)}
                                    className={cn("border-t", rowClassName && rowClassName(item))}
                                >
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
                                                {actions?.edit &&
                                                    (!actions.edit.isHidden || !actions.edit.isHidden?.(item)) && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8"
                                                            onClick={() => actions.edit?.onClick(item)}
                                                            disabled={actions.edit.isDisabled?.(item)}
                                                        >
                                                            <i className="fas fa-pencil-alt" />
                                                        </Button>
                                                    )}
                                                {actions?.delete &&
                                                    (!actions.delete.isHidden || !actions.delete.isHidden?.(item)) && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8"
                                                            onClick={() => actions.delete?.onClick(item)}
                                                            disabled={actions.delete.isDisabled?.(item)}
                                                        >
                                                            <i className="fas fa-trash-alt" />
                                                        </Button>
                                                    )}
                                                {actions?.custom &&
                                                    actions.custom.map((customAction, actionIndex) => (
                                                        (!customAction.isHidden || !customAction.isHidden?.(item)) && (
                                                            <Button
                                                                key={actionIndex}
                                                                variant="ghost"
                                                                size="icon"
                                                                className={cn(
                                                                    "bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8",
                                                                    customAction.className
                                                                )}
                                                                onClick={() => customAction.onClick(item)}
                                                                disabled={customAction.isDisabled?.(item)}
                                                            >
                                                                {customAction.icon}
                                                            </Button>
                                                        )
                                                    ))}
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
