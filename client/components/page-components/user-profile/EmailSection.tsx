'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputWithError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditButton from "./EditButton";
import PaginationSection from "../../common/PaginationSection";

const EmailSection = ({
    initialEmails,
}: {
    initialEmails: { address: string; isPrimary: boolean; }[];
}) => {
    const [emails, setEmails] = useState(initialEmails);
    const [formMode, setFormMode] = useState<{
        isOpen: boolean;
        mode: 'add' | 'edit';
        email: string;
        isPrimary: boolean;
        editIndex: number | null;
    }>({
        isOpen: false,
        mode: 'add',
        email: "",
        isPrimary: false,
        editIndex: null
    });

    const toggleFormMode = () => {
        // If form is open, close it. If closed, open it in add mode
        if (formMode.isOpen) {
            setFormMode({
                isOpen: false,
                mode: 'add',
                email: "",
                isPrimary: false,
                editIndex: null
            });
        } else {
            setFormMode({
                isOpen: true,
                mode: 'add',
                email: "",
                isPrimary: false,
                editIndex: null
            });
        }
    };

    const handleEditClick = (email: string, isPrimary: boolean, index: number) => {
        setFormMode({
            isOpen: true,
            mode: 'edit',
            email: email,
            isPrimary: isPrimary,
            editIndex: index
        });
    };

    const handleDeleteEmail = (index: number) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
    };

    const handleSubmit = () => {
        if (!formMode.email) return;

        if (formMode.mode === 'add') {
            // Add a new email
            setEmails([...emails, {
                address: formMode.email,
                isPrimary: formMode.isPrimary
            }]);
        } else if (formMode.mode === 'edit' && formMode.editIndex !== null) {
            // Update existing email
            const newEmails = [...emails];
            newEmails[formMode.editIndex] = {
                address: formMode.email,
                isPrimary: formMode.isPrimary
            };
            setEmails(newEmails);
        }

        // Reset form state
        setFormMode({
            isOpen: false,
            mode: 'add',
            email: "",
            isPrimary: false,
            editIndex: null
        });
    };

    return (
        <div className="bg-gray-50 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center p-4 ">
                <h2 className="font-medium text-lg">Email(s)</h2>
                <EditButton isEditing={formMode.isOpen} toggleEdit={toggleFormMode} />
            </div>

            {formMode.isOpen ? (
                <form className="p-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm">Email</label>
                        <InputWithError
                            type="email"
                            placeholder="Email"
                            value={formMode.email}
                            onChange={(e) => setFormMode({ ...formMode, email: e.target.value })}
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <Checkbox
                            id="primary"
                            checked={formMode.isPrimary}
                            onCheckedChange={(checked) => setFormMode({ ...formMode, isPrimary: checked as boolean })}
                        />
                        <label htmlFor="primary" className="ml-2 text-sm">Primary</label>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            className="bg-gray-700 hover:bg-gray-800"
                        >
                            {formMode.mode === 'add' ? 'Submit' : 'Update'}
                        </Button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <Table className="border mx-4">
                            <TableHeader className="bg-gray-200 hover:bg-gray-200">
                                <TableRow>
                                    <TableHead className="p-4 font-medium text-gray-600">Email Address</TableHead>
                                    <TableHead className="p-4 font-medium text-gray-600">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {emails.map((email, index) => (
                                    <TableRow key={index} className="border-t">
                                        <TableCell className="p-4">
                                            {email.address}
                                            {email.isPrimary && <span className="text-red-500 font-bold">*</span>}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditClick(email.address, email.isPrimary, index)}
                                                    className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                </Button>
                                                {index > 0 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                                        onClick={() => handleDeleteEmail(index)}
                                                    >
                                                        <i className="fas fa-trash-alt" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <PaginationSection
                        currentPage={1}
                        totalItems={emails.length}
                        itemsPerPage={10}
                        onPageChange={() => { }}
                    />
                </>
            )}
        </div>
    );
};

export default EmailSection;