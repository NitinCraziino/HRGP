'use client';
import { Role } from '@/types';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const EditRoleForm = ({ role }: { role: Role; }) => {
    const [roleName, setRoleName] = useState(role?.name || 'Minimal Access to Files');
    const [permissions, setPermissions] = useState({
        ATS: 'No Access',
        EMS: 'No Access',
        FILES: 'Minimal Access',
        TOOLS: 'No Access'
    });

    const handlePermissionChange = (system: string, level: string) => {
        setPermissions(prev => ({
            ...prev,
            [system]: level
        }));
    };

    return (
        <form className='p-6 space-y-6 bg-white rounded-lg shadow-sm mb-64'>
            <div className='flex items-center'>
                <Label className='text-lg font-medium w-32'>Role:</Label>
                <Input
                    placeholder='Enter role name'
                    className='w-full max-w-[600px] h-10'
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                />
            </div>

            <div>
                <Label className='text-lg font-medium mb-4 block'>Permissions:</Label>
                <div className='border rounded-md'>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b'>
                                <th className='w-1/5 py-3 px-4 text-left'></th>
                                <th className='w-1/5 py-3 px-4 text-center text-gray-500'>No Access</th>
                                <th className='w-1/5 py-3 px-4 text-center text-gray-500'>Minimal Access</th>
                                <th className='w-1/5 py-3 px-4 text-center text-gray-500'>Limited Access</th>
                                <th className='w-1/5 py-3 px-4 text-center text-gray-500'>Full Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['ATS', 'EMS', 'FILES', 'TOOLS'].map((system, i) => (
                                <tr key={system} className={`border-b ${i % 2 == 0 ? 'bg-gray-200' : ''}`}>
                                    <td className='py-4 px-4 font-medium'>{system}</td>
                                    {['No Access', 'Minimal Access', 'Limited Access', 'Full Access'].map((level) => (
                                        <td key={level} className='py-4 px-4 text-center'>
                                            <div className='flex justify-center'>
                                                <div
                                                    className={`w-12 h-6 rounded-full relative cursor-pointer ${permissions[system as keyof typeof permissions] === level ? 'bg-blue-500' : 'bg-gray-200'
                                                        }`}
                                                    onClick={() => handlePermissionChange(system, level)}
                                                >
                                                    <div
                                                        className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${permissions[system as keyof typeof permissions] === level ? 'translate-x-6' : 'translate-x-0.5'
                                                            }`}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex justify-end space-x-2 pt-4'>
                <Button
                    type="submit"
                    className='bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md'
                >
                    Submit
                </Button>
                <Button
                    type="button"
                    className='bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-md'
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditRoleForm;