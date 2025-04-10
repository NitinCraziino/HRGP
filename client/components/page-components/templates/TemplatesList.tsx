"use client";

import type { Template } from "@/types";
import { useState } from "react";
import { DataTable } from "@/components/common/DataTable";
import { Column } from "@/types/props";
import { Pencil } from "lucide-react";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";

interface TemplatesListProps {
    templates: Template[];
}

const TemplatesList = ({ templates }: TemplatesListProps) => {
    const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null);

    const columns = [{ header: "Template Name", accessorKey: "name" }];

    return (
        <>
            <DataTable
                data={templates}
                columns={columns as Column<Template>[]}
                keyExtractor={(item) => item.id}
                actions={{
                    custom: [
                        {
                            icon: <Pencil className="h-4 w-4" />,
                            onClick: (template) => {
                                window.location.href = `/edit-template/${template.id}`;
                            },
                        },
                    ],
                    delete: {
                        onClick: (template) => setDeletingTemplate(template),
                    },
                }}
                pagination={{
                    currentPage: 1,
                    totalItems: templates.length,
                    itemsPerPage: 10,
                    onPageChange: (page) => console.log("Page changed to", page),
                }}
                emptyState={<div>No templates found</div>}
            />
            {deletingTemplate && (
                <ConfirmDeleteDialog
                    isOpen={!!deletingTemplate}
                    onClose={() => setDeletingTemplate(null)}
                    onConfirm={() => { }}
                    itemName={deletingTemplate?.name}
                />
            )}
        </>
    );
};

export default TemplatesList;