import { Pencil, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

const LocationsSection = () => {
    return (
        <div className="mt-6">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-2xl font-bold">Location(s)</h2>
                <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                </Button>
            </div>

            {/* Locations Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left p-4 text-sm font-semibold">Address Type</th>
                            <th className="text-left p-4 text-sm font-semibold">Street Address</th>
                            <th className="text-left p-4 text-sm font-semibold">City</th>
                            <th className="text-left p-4 text-sm font-semibold">State</th>
                            <th className="text-left p-4 text-sm font-semibold">Country</th>
                            <th className="text-left p-4 text-sm font-semibold">Postal Code</th>
                            <th className="text-left p-4 text-sm font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-4">Primary</td>
                            <td className="p-4">45 Meetinghouse Lane #1083</td>
                            <td className="p-4">Sagamore Beach</td>
                            <td className="p-4">MA</td>
                            <td className="p-4">United States</td>
                            <td className="p-4">02562</td>
                            <td className="p-4">
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-800 bg-indigo-100 rounded-full h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-800 bg-indigo-100 rounded-full h-8 w-8">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                        <tr className="border-t">
                            <td className="p-4">Branch</td>
                            <td className="p-4">Calgiri</td>
                            <td className="p-4">Jaipur</td>
                            <td className="p-4">RJ</td>
                            <td className="p-4">India</td>
                            <td className="p-4">302017</td>
                            <td className="p-4">
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-800 bg-indigo-100 rounded-full h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-indigo-600 hover:text-indigo-800 bg-indigo-100 rounded-full h-8 w-8">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LocationsSection;