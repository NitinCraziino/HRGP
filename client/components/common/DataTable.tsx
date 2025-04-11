"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PaginationSection from "@/components/common/PaginationSection";
import { cn } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";

export type Column<T> = {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
    className?: string;
    isSortable?: boolean;
    sortKey?: string;
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
        icon: ReactNode;
        onClick: (item: T) => void;
        isDisabled?: (item: T) => boolean;
        isHidden?: (item: T) => boolean;
        className?: string;
    }>;
};

export type BulkAction<T> = {
    label: string;
    onClick: (selectedItems: T[]) => void;
    className?: string;
    isDisabled?: (selectedItems: T[]) => boolean;
};

export type DataTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    actions?: ActionConfig<T>;
    bulkActions?: BulkAction<T>[];
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
    emptyState?: ReactNode;
    isLoading?: boolean;
    error?: Error | string | any;
    errorComponent?: ReactNode;
    onRetry?: () => void;
    onSortChange?: (column: string, direction: SortDirection) => void;
    defaultSorting?: SortingState;
    manualSorting?: boolean;
    selectable?: boolean;
};

export type SortDirection = "asc" | "desc" | null;

export type SortingState = {
    column: string | null;
    direction: SortDirection;
};

export function DataTable<T>({
    data,
    columns,
    actions,
    bulkActions,
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
    onSortChange,
    defaultSorting,
    manualSorting,
    selectable = false,
}: DataTableProps<T>) {
    const hasActions = actions && (actions.edit || actions.delete || (actions.custom && actions.custom.length > 0));

    // Selection state
    const [selectedRows, setSelectedRows] = useState<Record<string | number, boolean>>({});

    // Check if all rows are selected
    const allSelected = data.length > 0 && data.every(item => selectedRows[keyExtractor(item)]);

    // Get array of selected items
    const selectedItems = useMemo(() => {
        return data.filter(item => selectedRows[keyExtractor(item)]);
    }, [data, selectedRows, keyExtractor]);

    // Toggle all rows selection
    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedRows({});
        } else {
            const newSelected: Record<string | number, boolean> = {};
            data.forEach(item => {
                newSelected[keyExtractor(item)] = true;
            });
            setSelectedRows(newSelected);
        }
    };

    // Toggle single row selection
    const toggleRowSelection = (id: string | number) => {
        setSelectedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    // Sorting state
    const [sorting, setSorting] = useState<SortingState>(defaultSorting || { column: null, direction: null });

    // Handle column sort
    const handleSort = useCallback((column: Column<T>) => {
        if (!column.isSortable || !column.sortKey) return;

        const sortKey = column.sortKey;
        let direction: SortDirection = "asc";

        if (sorting.column === sortKey) {
            if (sorting.direction === "asc") {
                direction = "desc";
            } else if (sorting.direction === "desc") {
                direction = null;
            }
        }

        const newSorting = {
            column: direction === null ? null : sortKey,
            direction,
        };

        setSorting(newSorting);

        if (onSortChange) {
            onSortChange(sortKey, direction);
        }
    }, [sorting, onSortChange, columns]);

    // Sort data if not manually sorted
    const sortedData = useMemo(() => {
        if (manualSorting || !sorting.column || !sorting.direction) {
            return data;
        }

        return [...data].sort((a, b) => {
            const column = columns.find((col) => col.sortKey === sorting.column);
            if (!column || !column.accessorKey) return 0;

            const aValue = a[column.accessorKey];
            const bValue = b[column.accessorKey];

            if (aValue === bValue) return 0;

            // Handle different data types
            if (typeof aValue === "string" && typeof bValue === "string") {
                return sorting.direction === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            if (aValue === null || aValue === undefined) return sorting.direction === "asc" ? -1 : 1;
            if (bValue === null || bValue === undefined) return sorting.direction === "asc" ? 1 : -1;

            return sorting.direction === "asc" ? (aValue < bValue ? -1 : 1) : bValue < aValue ? -1 : 1;
        });
    }, [data, columns, sorting, manualSorting]);

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
                                {selectable && (
                                    <TableHead className="w-[40px] p-4">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                    </TableHead>
                                )}
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
                                    {selectable && (
                                        <TableCell className="p-4">
                                            <div className="h-4 bg-gray-200 rounded animate-pulse" />
                                        </TableCell>
                                    )}
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
            {/* Bulk action buttons */}
            {selectable && bulkActions && bulkActions.length > 0 && selectedItems.length > 0 && (
                <div className="bg-gray-100 p-4 flex gap-2">
                    {bulkActions.map((action, index) => (
                        <Button
                            key={index}
                            onClick={() => action.onClick(selectedItems)}
                            disabled={action.isDisabled ? action.isDisabled(selectedItems) : false}
                            className={cn("bg-indigo-600 hover:bg-indigo-700", action.className)}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            )}

            <div className="overflow-x-auto">
                <Table className={cn("w-full", tableClassName)}>
                    <TableHeader className={cn("bg-gray-100 hover:bg-gray-200", headerClassName)}>
                        <TableRow>
                            {selectable && (
                                <TableHead className="w-[40px] p-4">
                                    <Checkbox
                                        checked={allSelected}
                                        onCheckedChange={toggleSelectAll}
                                        aria-label="Select all rows"
                                    />
                                </TableHead>
                            )}
                            {columns.map((column, index) => (
                                <TableHead
                                    key={index}
                                    className={cn(
                                        "p-4 font-bold text-gray-600",
                                        column.className,
                                        column.isSortable && "cursor-pointer select-none",
                                    )}
                                    onClick={() => column.isSortable && handleSort(column)}
                                >
                                    <div className="flex items-center gap-1">
                                        {column.header}
                                        {column.isSortable && (
                                            <div className="flex flex-col ml-1">
                                                {sorting.column === column.sortKey ? (
                                                    sorting.direction === "asc" ? (
                                                        <ArrowUp className="h-5 w-5" />
                                                    ) : sorting.direction === "desc" ? (
                                                        <ArrowDown className="h-5 w-5" />
                                                    ) : (
                                                        <ArrowUpDown className="h-5 w-5 text-gray-400" />
                                                    )
                                                ) : (
                                                    <ArrowUpDown className="h-5 w-5 text-gray-400" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                            {hasActions && <TableHead className="p-4 font-bold text-gray-600 text-center">Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length + (hasActions ? 1 : 0) + (selectable ? 1 : 0)} className="p-4 text-center">
                                    {emptyState || "No data found"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedData.map((item) => {
                                const rowId = keyExtractor(item);
                                const isSelected = !!selectedRows[rowId];

                                return (
                                    <TableRow
                                        key={rowId}
                                        className={cn(
                                            "border-t",
                                            isSelected && "bg-blue-50",
                                            rowClassName && rowClassName(item)
                                        )}
                                    >
                                        {selectable && (
                                            <TableCell className="p-4">
                                                <Checkbox
                                                    checked={isSelected}
                                                    onCheckedChange={() => toggleRowSelection(rowId)}
                                                    aria-label={`Select row ${rowId}`}
                                                />
                                            </TableCell>
                                        )}
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
                                                            <i className="fas fa-pencil-alt"></i>
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
                                                            <i className="fas fa-trash"></i>
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
                                );
                            })
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
