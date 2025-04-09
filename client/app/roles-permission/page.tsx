import PrivateContainer from '@/components/hoc/PrivateContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import RolesList from '@/components/page-components/roles-permission/RolesList';

const roles = [
    { id: "1", name: "Company Admin", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "2", name: "Company Employee", isOn: true, hasHelp: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "3", name: "Minimal Access to Files", isOn: false, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "4", name: "Developers", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "5", name: "Limited Access to Files", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "6", name: "No Access to Files", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "7", name: "Full Access to ATS Only", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "8", name: "Full Access to EMS Only", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "9", name: "Limited Access to EMS Only", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "10", name: "Full Access to ATS & EMS Only", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "11", name: "No Access Period", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
    { id: "12", name: "Access to Files/Tools, No Access to ATS/EMS", isOn: true, permissions: { ATS: "Full Access", EMS: "Full Access", FILES: "Full Access", TOOLS: "Full Access" } },
];

const page = () => {
    return (
        <ScrollArea className='h-full'>
            <PrivateContainer className='pb-80'>
                <div className="p-6 space-y-6 bg-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold" />
                        <Link href="/add-template">
                            <Button className='bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs'>
                                Add Role
                            </Button>
                        </Link>
                    </div>

                    <RolesList roles={roles} />
                </div>
            </PrivateContainer>
        </ScrollArea>
    );
};

export default page;