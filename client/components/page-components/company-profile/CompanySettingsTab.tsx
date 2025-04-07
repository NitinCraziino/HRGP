import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const CompanySettingsTab = () => {
    return (
        <TabsContent value="settings" className="mt-6">
            <Card className="border rounded-md shadow-sm p-6">
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="automated-job-code" defaultChecked />
                        <label htmlFor="automated-job-code" className="text-sm font-medium">
                            Automated Job Code
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="send-twilio" />
                        <label htmlFor="send-twilio" className="text-sm font-medium">
                            Send Twilio Opt-In Email
                        </label>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="resume-optional" defaultChecked />
                        <label htmlFor="resume-optional" className="text-sm font-medium">
                            Resume Optional
                        </label>

                        <div className="ml-6">
                            <Select defaultValue="form">
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="form">Form</SelectItem>
                                    <SelectItem value="file">File</SelectItem>
                                    <SelectItem value="link">Link</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox id="recruit-for-customers" />
                        <label htmlFor="recruit-for-customers" className="text-sm font-medium">
                            Recruit For Customers
                        </label>
                    </div>

                    <div className="flex justify-end">
                        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
                            Update
                        </Button>
                    </div>
                </div>
            </Card>
        </TabsContent>
    );
};

export default CompanySettingsTab;