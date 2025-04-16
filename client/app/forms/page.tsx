"use client";

import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import { DataTable } from "@/components/common/DataTable";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import { Button } from "@/components/ui/button";
import { Column } from "@/types/props";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Form = {
  id: number;
  title: string;
  category: string;
};

const forms = [
  {
    id: 1,
    title: "Form 1",
    category: "Category 1",
  },
  {
    id: 2,
    title: "Form 2",
    category: "Category 2",
  },
];

const columns: Column<Form>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Category",
    accessorKey: "category",
  },
];

const page = () => {
  const [deleteForm, setDeleteForm] = useState<Form | null>(null);
  const router = useRouter();
  return (
    <PrivateContainer>
      <div className="p-6 space-y-6 bg-white">
        <div className="flex justify-end items-center">
          <Link href="/forms/create-new">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs">
              Create New Form
            </Button>
          </Link>
        </div>
        <DataTable
          data={forms}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyState="No forms found"
          isLoading={false}
          error={null}
          onRetry={() => {}}
          actions={{
            custom: [
              {
                icon: <i className="fas fa-copy" />,
                onClick: (form) => {
                  navigator.clipboard.writeText(`${window.location.origin}/forms/${form.id}`);
                },
              },
              {
                icon: <i className="fas fa-eye" />,
                onClick: (form) => {
                  router.push(`/forms/${form.id}`);
                },
                className: "bg-green-600 text-white hover:bg-green-700 rounded-full",
              },
            ],
            delete: {
              onClick: (form) => {
                setDeleteForm(form);
              },
            },
            edit: {
              onClick: (form) => {
                router.push(`/forms/${form.id}/edit`);
              },
            },
          }}
        />
      </div>
      {deleteForm && (
        <ConfirmDeleteDialog
          isOpen={!!deleteForm}
          onClose={() => setDeleteForm(null)}
          onConfirm={() => {}}
          cancelText="Cancel"
          itemName={deleteForm?.title}
          title="Delete Form"
        />
      )}
    </PrivateContainer>
  );
};

export default page;
