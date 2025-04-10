'use client';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import LocationFormInputs from './LocationFormInputs';
import { DataTable } from '@/components/common/DataTable';
import { Column } from '@/types/props';

const locations = [
    {
        addressId: 1,
        addressType: 'Primary',
        address: '45 Meetinghouse Lane #1083',
        city: 'Sagamore Beach',
        state: 'MA',
        country: 'United States',
        postalCode: '02562',
    },
    {
        addressId: 2,
        addressType: 'Branch',
        address: 'Calgiri',
        city: 'Jaipur',
        state: 'RJ',
        country: 'India',
        postalCode: '302017',
    },
];

const LocationSchema = z.object({
    addressType: z.string().min(1, { message: "Address type is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(2, { message: "Country is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
});

export type LocationFormInputs = z.infer<typeof LocationSchema>;

const LocationsSection = () => {
    const [editMode, setEditMode] = useState<{
        isEditing: boolean;
        editLocation: LocationFormInputs | null;
    }>({
        isEditing: false,
        editLocation: null,
    });

    const {
        control,
        setValue,
        setError,
        register,
        formState: { errors, isSubmitting },
        getValues,
        clearErrors,
        reset,
        trigger,
        watch
    } = useForm<LocationFormInputs>();

    const handleEditMode = () => {
        if (editMode.isEditing) {
            setEditMode({ ...editMode, isEditing: false });
            clearErrors();
            reset();
        } else {
            setEditMode({ ...editMode, isEditing: true });
        }
    };

    const handleEditLocation = async (data: LocationFormInputs) => {
        const isValid = await trigger();
        if (!isValid) return;
        if (editMode.editLocation) {
            console.log(data);
        } else {
            console.log(data);
        }
    };

    const columns = [
        { header: "Address Type", accessorKey: "addressType" },
        { header: "Street Address", accessorKey: "address" },
        { header: "City", accessorKey: "city" },
        { header: "State", accessorKey: "state" },
        { header: "Country", accessorKey: "country" },
        { header: "Postal Code", accessorKey: "postalCode" },
    ];

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold">Location(s)</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEditMode}
                    className="bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 rounded-full"
                >
                    {editMode.isEditing ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </Button>
            </div>

            {!editMode.isEditing ? (
                <DataTable
                    data={locations}
                    columns={columns as Column<LocationFormInputs>[]}
                    keyExtractor={(item) => item.addressId}
                    actions={{
                        edit: {
                            onClick: (location) => {
                                reset();
                                setEditMode({
                                    isEditing: true,
                                    editLocation: {
                                        addressType: location.addressType,
                                        address: location.address,
                                        city: location.city,
                                        state: location.state,
                                        country: location.country,
                                        postalCode: location.postalCode,
                                    },
                                });
                            },
                        },
                        delete: {
                            onClick: (location) => {
                                console.log("Delete location", location);
                            },
                        },
                    }}
                    pagination={{
                        currentPage: 1,
                        totalItems: locations.length,
                        itemsPerPage: 10,
                        onPageChange: (page) => console.log("Page changed to", page),
                    }}
                />
            ) : (
                <LocationFormInputs
                    control={control}
                    errors={errors}
                    watch={watch}
                    isLoading={isSubmitting}
                    setValue={setValue}
                    setError={setError}
                    register={register}
                    onSubmit={handleEditLocation}
                    getValues={getValues}
                    values={editMode.editLocation!}
                />
            )}
        </div>
    );
};

export default LocationsSection;
