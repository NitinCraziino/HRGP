"use client";

import type { Template } from "@/types";
import { useState } from "react";
import { DeleteTemplateDialog } from "./DeleteTemplateDialog";
import { DataTable, Column } from "@/components/common/DataTable";
import { Pencil } from "lucide-react";

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

            <DeleteTemplateDialog
                template={deletingTemplate}
                isOpen={!!deletingTemplate}
                onClose={() => setDeletingTemplate(null)}
                onDelete={() => { }}
            />
        </>
    );
};

export default TemplatesList;