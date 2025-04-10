import PrivateContainer from '@/components/hoc/PrivateContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import RolesList from '@/components/page-components/roles-permission/RolesList';


const page = () => {
    return (
        <ScrollArea className='h-full'>
            <PrivateContainer className='pb-80'>
                <div className="p-6 space-y-6 bg-white">
                    <div className="flex justify-end items-center">
                        <Link href="/add-template">
                            <Button className='bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs'>
                                Add Role
                            </Button>
                        </Link>
                    </div>

                    <RolesList />
                </div>
            </PrivateContainer>
        </ScrollArea>
    );
};

export default page;