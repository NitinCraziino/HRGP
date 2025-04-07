import React from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PrivateContainer from '@/components/hoc/PrivateContainer';
const page = () => {
    return (
        <>
            <PageHeader title="Company Profile" />
            <PrivateContainer>
                <div className='rounded-lg p-4'>
                    <h1 className='text-2xl font-bold'>Company Profile</h1>
                </div>
            </PrivateContainer>
        </>
    );
};

export default page;