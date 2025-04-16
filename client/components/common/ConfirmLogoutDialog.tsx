"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useAuth from "@/hooks/states/useAuth";
import { useRouter } from "next/navigation";
import { memo, useCallback } from "react";

interface ConfirmLogoutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmLogoutDialog = ({ isOpen, onOpenChange }: ConfirmLogoutDialogProps) => {
  const { logout } = useAuth();
  const router = useRouter();

  const handleConfirm = useCallback(() => {
    logout();
    setTimeout(() => {
      router.push("/signin");
    }, 0);

    onOpenChange(false);
  }, [onOpenChange, logout, router]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(ConfirmLogoutDialog);
