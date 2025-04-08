"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { Template } from "@/types";
import { useState } from "react";
import Link from "next/link";
import { DeleteTemplateDialog } from "./DeleteTemplateDialog";
import PaginationSection from "@/components/common/PaginationSection";

interface TemplatesListProps {
    templates: Template[];
}

const TemplatesList = ({ templates }: TemplatesListProps) => {
    const [deletingTemplate, setDeletingTemplate] = useState<Template | null>(null);

    const handleCloseDeleteDialog = () => {
        setDeletingTemplate(null);
    };

    return (
        <>
            <div className="border rounded-none overflow-hidden">
                <Table className="border">
                    <TableHeader className="bg-gray-200 hover:bg-gray-200">
                        <TableRow>
                            <TableHead className="p-4 font-medium text-gray-600">Template Name</TableHead>
                            <TableHead className="p-4 font-medium text-gray-600">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {templates.map((template) => (
                            <TableRow key={template.id}>
                                <TableCell className="p-4">{template.name}</TableCell>
                                <TableCell className="p-4">
                                    <div className="flex gap-2">
                                        <Link
                                            href={`/edit-template/${template.id}`}
                                            className="hover:bg-indigo-100 rounded-full"
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                            >
                                                <i className="fas fa-pencil-alt" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                            onClick={() => setDeletingTemplate(template)}
                                        >
                                            <i className="fas fa-trash-alt" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginationSection
                currentPage={1}
                totalItems={templates.length}
                itemsPerPage={10}
                onPageChange={() => { }}
            />

            <DeleteTemplateDialog
                template={deletingTemplate}
                isOpen={!!deletingTemplate}
                onClose={handleCloseDeleteDialog}
                onDelete={() => { }}
            />
        </>
    );
};

export default TemplatesList;