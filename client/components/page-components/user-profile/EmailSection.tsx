'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputWithError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import EditButton from "./EditButton";
import { DataTable } from "@/components/common/DataTable";
import { Column } from "@/types/props";

type Email = {
    address: string;
    isPrimary: boolean;
};

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

    const handleDeleteEmail = (address: string) => {
        const newEmails = [...emails];
        newEmails.splice(newEmails.findIndex(email => email.address === address), 1);
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

    const columns = [{ header: "Email", accessorKey: "address" }];

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
                    <div className="p-4">
                        <DataTable
                            data={emails}
                            columns={columns as Column<Email>[]}
                            keyExtractor={(item) => item.address}
                            actions={{
                                edit: {
                                    onClick: (email) => handleEditClick(email.address, email.isPrimary, 1),
                                },
                                delete: {
                                    onClick: (email) => handleDeleteEmail(email.address),
                                },
                            }}
                            pagination={{
                                currentPage: 1,
                                totalItems: emails.length,
                                itemsPerPage: 10,
                                onPageChange: (page) => console.log("Page changed to", page),
                            }}
                            emptyState={<div>No emails found</div>}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default EmailSection;