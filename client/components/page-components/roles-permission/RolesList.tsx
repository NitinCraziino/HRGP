"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import DeleteRoleDialog from "./DeleteRoleDialog";
import { Switch } from "@/components/ui/switch";
import { CircleHelp, Pencil, Trash } from "lucide-react";
import { Role } from "@/types";

interface RolesListProps {
    roles: Role[];
}

const RolesList = ({ roles }: RolesListProps) => {
    const [deletingRole, setDeletingRole] = useState<Role | null>(null);

    const handleCloseDeleteDialog = () => {
        setDeletingRole(null);
    };

    return (
        <>
            <div className="rounded-sm overflow-hidden border-1">
                <div className="bg-gray-100 py-3 px-4 flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">Roles</h3>
                    <h3 className="font-medium text-gray-800">Permissions</h3>
                </div>

                <div className="divide-y">
                    {roles.map((role) => (
                        <div key={role.id} className="flex justify-between items-center py-1 px-4">
                            <div className="flex items-center gap-1">
                                {role.name}
                                {role.hasHelp && <CircleHelp className="h-4 w-4 text-gray-500 ml-1" />}
                            </div>
                            <div className="flex items-center gap-2">
                                <Link href={`/roles-permission/${role.id}`} className="hover:bg-indigo-100 rounded-full">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8 cursor-pointer"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700 h-8 w-8 cursor-pointer"
                                    onClick={() => setDeletingRole(role)}
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                                <Switch
                                    checked={role.isOn}
                                    className="data-[state=checked]:bg-pink-500 data-[state=unchecked]:bg-gray-300 cursor-pointer"
                                    onCheckedChange={() => { }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <DeleteRoleDialog
                role={deletingRole}
                isOpen={!!deletingRole}
                onClose={handleCloseDeleteDialog}
                onDelete={() => { }}
            />
        </>
    );
};

export default RolesList;
