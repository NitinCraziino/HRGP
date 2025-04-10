'use client';

import PrivateContainer from '@/components/hoc/PrivateContainer';
import InputWithError from '@/components/form-components/InputWithError';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SelectWithSearch from '@/components/form-components/SelectWithSearch';

const page = () => {
    const [positionTitle, setPositionTitle] = useState<string>('');
    const [workflowName, setWorkflowName] = useState('');
    const [errors, setErrors] = useState({
        positionTitle: '',
        workflowName: '',
    });
    return (
        <PrivateContainer className='pb-72' title='Create New Guided Hiring Workflow'>
            <div className="p-6 space-y-6 bg-white">
                <form className="flex flex-col space-y-4 justify-center items-center w-full">
                    <div className='grid grid-cols-2 gap-4 w-full'>
                        <div className='w-full'>
                            <SelectWithSearch
                                options={[{ value: '1', label: 'Position Title 1' }, { value: '2', label: 'Position Title 2' }]}
                                onChange={(value) => setPositionTitle(value)}
                                value={positionTitle}
                                label='Position Title'
                                error={errors.positionTitle}
                                placeholder='Select Position Title'
                                emptyIndicator='No position titles found'
                            />
                        </div>
                        <InputWithError
                            value={workflowName}
                            className='h-8 max-h-8 py-5'
                            placeholder='Enter Workflow Name'
                            label='Workflow Name'
                            error={errors.workflowName}
                            onChange={(e) => setWorkflowName(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-end items-center w-full gap-4'>
                        <Button
                            type='submit'
                            className='bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs'
                        >
                            Submit
                        </Button>
                        <Link href='/guided-hiring'>
                            <Button className="rounded-xs">
                                Back
                            </Button>
                        </Link>
                    </div>
                </form>
            </div >
        </PrivateContainer >
    );
};

export default page;