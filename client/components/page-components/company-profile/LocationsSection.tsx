'use client';
import { Pencil, Trash, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableHeader } from '@/components/ui/table'; // Import shadcn table components
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import LocationFormInputs from './LocationFormInputs';

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
                    {editMode.isEditing ? <i className='fas fa-times' /> : <i className='fas fa-plus' />}
                </Button>
            </div>

            {!editMode.isEditing && (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left p-4 text-sm font-semibold">Address Type</TableHead>
                                <TableHead className="text-left p-4 text-sm font-semibold">Street Address</TableHead>
                                <TableHead className="text-left p-4 text-sm font-semibold">City</TableHead>
                                <TableHead className="text-left p-4 text-sm font-semibold">State</TableHead>
                                <TableHead className="text-left p-4 text-sm font-semibold">Country</TableHead>
                                <TableHead className="text-left p-4 text-sm font-semibold">Postal Code</TableHead>
                                <TableHead className="text-left p-4 text-sm font-semibold">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {locations.map((location) => (
                                <TableRow className="border-t" key={location.addressId}>
                                    <TableCell className="p-4">{location.addressType}</TableCell>
                                    <TableCell className="p-4">{location.address}</TableCell>
                                    <TableCell className="p-4">{location.city}</TableCell>
                                    <TableCell className="p-4">{location.state}</TableCell>
                                    <TableCell className="p-4">{location.country}</TableCell>
                                    <TableCell className="p-4">02562</TableCell>
                                    <TableCell className="p-4">
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-8 w-8"
                                                onClick={() => {
                                                    reset();
                                                    setEditMode({ isEditing: true, editLocation: location });
                                                }}
                                            >
                                                <i className='fas fa-pencil-alt' />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full h-8 w-8"
                                            >
                                                <i className='fas fa-trash-alt' />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {editMode.isEditing && (
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
