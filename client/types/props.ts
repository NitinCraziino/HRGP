import { ReactNode } from "react";

export type PublicPageContainerContainerProps = {
  children: ReactNode;
  className?: string;
};

export type RootLayoutProps = {
  children: ReactNode;
};

export type WrapperProps = {
  children: ReactNode;
  className?: string;
};

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
  emptyState?: ReactNode;
  isLoading?: boolean;
  error?: Error | string | any;
  errorComponent?: ReactNode;
  onRetry?: () => void;
  onSortChange?: (column: string, direction: SortDirection) => void;
  defaultSorting?: SortingState;
  manualSorting?: boolean;
};

export type SortDirection = "asc" | "desc" | null;

export type SortingState = {
  column: string | null;
  direction: SortDirection;
};
