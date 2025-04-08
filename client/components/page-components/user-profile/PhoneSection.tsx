'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputWithError } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import EditButton from "./EditButton";
import PaginationSection from "../../common/PaginationSection";
import { PhoneInputComponent } from "@/components/ui/phoneinput";

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
                <>
                    <div className="overflow-x-auto">
                        <Table className="border mx-4 ">
                            <TableHeader className="bg-gray-200 hover:bg-gray-200">
                                <TableRow>
                                    <TableHead className="p-4 font-medium text-gray-600">Phone Number</TableHead>
                                    <TableHead className="p-4 font-medium text-gray-600">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {phones.map((phone, index) => (
                                    <TableRow key={index} className="border-t">
                                        <TableCell className="p-4">
                                            {phone.phone}
                                            {phone.isPrimary && <span className="text-red-500">*</span>}
                                        </TableCell>
                                        <TableCell className="p-4">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditClick(phone.phone, phone.isPrimary, index)}
                                                    className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                                >
                                                    <i className="fas fa-pencil-alt" />
                                                </Button>
                                                {index > 0 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="bg-indigo-600 text-white hover:text-white rounded-full hover:bg-indigo-700"
                                                        onClick={() => handleDeletePhone(index)}
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
                        totalItems={phones.length}
                        itemsPerPage={10}
                        onPageChange={() => { }}
                    />
                </>
            )}
        </div>
    );
};

export default PhoneSection;