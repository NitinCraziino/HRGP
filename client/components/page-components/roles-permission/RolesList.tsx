"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { CircleHelp, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Role } from "@/types";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";

const roles: Role[] = [
    {
        id: "1",
        name: "Administrator",
        hasHelp: true,
        isOn: true,
        permissions: {
            ATS: "true",
            EMS: "true",
            FILES: "true",
            TOOLS: "true",
        },
    },
    {
        id: "2",
        name: "Editor",
        hasHelp: false,
        isOn: false,
        permissions: {
            ATS: "false",
            EMS: "false",
            FILES: "false",
            TOOLS: "false",
        },
    },
    {
        id: "3",
        name: "Viewer",
        hasHelp: true,
        isOn: true,
        permissions: {
            ATS: "true",
            EMS: "true",
            FILES: "true",
            TOOLS: "true",
        },
    },
];

const RolesList = () => {
    const [deletingRole, setDeletingRole] = useState<Role | null>(null);

    const columns = [
        {
            header: "Roles",
            cell: (role: Role) => (
                <div className="flex items-center gap-1">
                    {role.name}
                    {role.hasHelp && <CircleHelp className="h-4 w-4 text-gray-500 ml-1" />}
                </div>
            ),
        },
        {
            header: "Permissions",
            cell: (role: Role) => (
                <div className="flex justify-end">
                    <Switch
                        checked={role.isOn}
                        className="data-[state=checked]:bg-pink-500 data-[state=unchecked]:bg-gray-300 cursor-pointer"
                        onCheckedChange={() => { }}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-sm overflow-hidden border-1">
                <DataTable
                    data={roles}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                    actions={{
                        custom: [
                            {
                                icon: <Pencil className="h-4 w-4" />,
                                onClick: (role) => {
                                    window.location.href = `/roles-permission/${role.id}`;
                                },
                            },
                        ],
                        delete: {
                            onClick: (role) => setDeletingRole(role),
                        },
                    }}
                    tableClassName="border-none"
                    className="border-none"
                    emptyState={<div>No roles found</div>}
                />
            </div>
            {deletingRole && (
                <ConfirmDeleteDialog
                    isOpen={!!deletingRole}
                    onClose={() => setDeletingRole(null)}
                    onConfirm={() => { }}
                    itemName={deletingRole.name}
                />
            )}
        </>
    );
};

export default RolesList;
