'use client';

import { DataTable } from '@/components/common/DataTable';
import PrivateContainer from '@/components/hoc/PrivateContainer';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Column } from '@/components/common/DataTable';

type Workflow = {
    id: number;
    positionTitle: string;
    workflowName: string;
};

const workflows: Workflow[] = [
    {
        id: 1,
        positionTitle: 'Software Engineer',
        workflowName: 'Software Engineer Workflow',
    },
    {
        id: 2,
        positionTitle: 'Software Engineer',
        workflowName: 'Software Engineer Workflow',
    },
];

const columns = [
    {
        header: 'Position Title',
        accessorKey: 'positionTitle',
    },
    {
        header: 'Workflow Title',
        accessorKey: 'workflowName',
    },
];
const page = () => {

    return (
        <PrivateContainer className='pb-72'>
            <div className="p-6 space-y-6 bg-white">
                <div className="flex justify-end items-center">
                    <Button className='bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs'>
                        Add Guided Workflow
                    </Button>
                </div>

                <DataTable
                    data={workflows}
                    columns={columns as Column<Workflow>[]}
                    keyExtractor={(item) => item.id}
                    emptyState="No workflows found"
                    isLoading={false}
                    error={null}
                    onRetry={() => { }}
                    actions={{
                        delete: {
                            onClick: (workflow) => {
                                console.log(workflow);
                            },
                        },
                        edit: {
                            onClick: (workflow) => {
                                console.log(workflow);
                            },
                        },
                        custom: [
                            {
                                icon: <i className='fas fa-copy' />,
                                onClick: (workflow) => {
                                    navigator.clipboard.writeText(`${window.location.origin}/guided-hiring/${workflow.id}`);
                                },
                            }
                        ]
                    }}
                />
            </div>
        </PrivateContainer>
    );
};

export default page;