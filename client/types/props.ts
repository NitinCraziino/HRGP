import { ReactNode } from "react";

export type ContainerProps = {
    children: ReactNode;
    className?: string;
};

export type RootLayoutProps = {
    children: ReactNode;
};

export type WrapperProps = {
    children: ReactNode;
};