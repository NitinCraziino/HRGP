"use client";

import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { CircleHelp, Pencil } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Role } from "@/types";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";

const roles = [
  {
    id: "1",
    name: "Company Admin",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "2",
    name: "Company Employee",
    isOn: true,
    hasHelp: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "3",
    name: "Minimal Access to Files",
    isOn: false,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "4",
    name: "Developers",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "5",
    name: "Limited Access to Files",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "6",
    name: "No Access to Files",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "7",
    name: "Full Access to ATS Only",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "8",
    name: "Full Access to EMS Only",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "9",
    name: "Limited Access to EMS Only",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "10",
    name: "Full Access to ATS & EMS Only",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "11",
    name: "No Access Period",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
    },
  },
  {
    id: "12",
    name: "Access to Files/Tools, No Access to ATS/EMS",
    isOn: true,
    permissions: {
      ATS: "Full Access",
      EMS: "Full Access",
      FILES: "Full Access",
      TOOLS: "Full Access",
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
            onCheckedChange={() => {}}
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
          onConfirm={() => {}}
          itemName={deletingRole.name}
        />
      )}
    </>
  );
};

export default RolesList;
