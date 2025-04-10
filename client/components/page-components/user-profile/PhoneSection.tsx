'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import EditButton from "./EditButton";
import { PhoneInputComponent } from "@/components/form-components/PhoneInput";
import { DataTable } from "@/components/common/DataTable";
import { Column } from "@/types/props";

type Phone = {
    phone: string;
    isPrimary: boolean;
};

const PhoneSection = ({
    initialPhones,
}: {
    initialPhones: { phone: string; isPrimary: boolean; }[];
}) => {
    const [phones, setPhones] = useState(initialPhones);
    const [formMode, setFormMode] = useState<{
        isOpen: boolean;
        mode: 'add' | 'edit';
        phone: string;
        isPrimary: boolean;
        editIndex: number | null;
    }>({
        isOpen: false,
        mode: 'add',
        phone: "",
        isPrimary: false,
        editIndex: null
    });

    const [phoneError, setPhoneError] = useState("");

    const toggleFormMode = () => {
        // If form is open, close it. If closed, open it in add mode
        if (formMode.isOpen) {
            setFormMode({
                isOpen: false,
                mode: 'add',
                phone: "",
                isPrimary: false,
                editIndex: null
            });
        } else {
            setFormMode({
                isOpen: true,
                mode: 'add',
                phone: "",
                isPrimary: false,
                editIndex: null
            });
        }
    };

    const handleEditClick = (phone: string, isPrimary: boolean, index: number) => {
        setFormMode({
            isOpen: true,
            mode: 'edit',
            phone: phone,
            isPrimary: isPrimary,
            editIndex: index
        });
    };

    const handleDeletePhone = (index: number) => {
        const newPhones = [...phones];
        newPhones.splice(index, 1);
        setPhones(newPhones);
    };

    const handleSubmit = () => {
        if (!formMode.phone) return;

        if (formMode.mode === 'add') {
            // Add a new phone
            setPhones([...phones, {
                phone: formMode.phone,
                isPrimary: formMode.isPrimary
            }]);
        } else if (formMode.mode === 'edit' && formMode.editIndex !== null) {
            // Update existing phone
            const newPhones = [...phones];
            newPhones[formMode.editIndex] = {
                phone: formMode.phone,
                isPrimary: formMode.isPrimary
            };
            setPhones(newPhones);
        }

        // Reset form state
        setFormMode({
            isOpen: false,
            mode: 'add',
            phone: "",
            isPrimary: false,
            editIndex: null
        });
        setPhoneError("");
    };

    const columns = [{ header: "Phone Number", accessorKey: "phone" }];

    return (
        <div className="bg-gray-50 rounded-lg border shadow-sm">
            <div className="flex justify-between items-center p-4 ">
                <h2 className="font-medium text-lg">Phone(s)</h2>
                <EditButton isEditing={formMode.isOpen} toggleEdit={toggleFormMode} />
            </div>

            {formMode.isOpen ? (
                <form className="p-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm">Phone Number</label>
                        <PhoneInputComponent
                            placeholder="Phone Number"
                            error={phoneError}
                            phone={formMode.phone}
                            setPhone={(phone) => setFormMode({ ...formMode, phone: phone })}
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
                <div className="p-4">
                    <DataTable
                        data={phones}
                        columns={columns as Column<Phone>[]}
                        keyExtractor={(item) => item.phone}
                        actions={{
                            edit: {
                                // TODO: Add edit action
                                onClick: (phone) => handleEditClick(phone.phone, phone.isPrimary, 1),
                            },
                            delete: {
                                // TODO: Add delete action
                                onClick: (phone) => handleDeletePhone(1),
                            },
                        }}
                        pagination={{
                            currentPage: 1,
                            totalItems: phones.length,
                            itemsPerPage: 10,
                            onPageChange: (page) => console.log("Page changed to", page),
                        }}
                        emptyState={<div>No phones found</div>}
                    />
                </div>
            )}
        </div>
    );
};

export default PhoneSection;