import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, Plus, Copy, Trash } from "lucide-react";

const CompanyProfileTab = () => {
    return (
        <TabsContent value="profile" className="mt-6">
            <Card className="border rounded-md shadow-sm p-6">
                <div className="p-6">
                    {/* Overview Section */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Overview</h2>
                        <Button variant="ghost" size="icon">
                            <Pencil className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* About Us */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-2">About Us</h3>
                        <p className="text-gray-600">More information.</p>
                    </div>

                    {/* Industry */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-2">Industry</h3>
                        <p className="text-gray-600">Computer Software</p>
                    </div>

                    {/* Company Profile */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-2">Company Profile</h3>
                        <div className="flex items-center border rounded-md p-2 justify-between bg-gray-50">
                            <div className="flex items-center">
                                <span className="text-gray-600">https://hrgp.io/app/company/</span>
                                <span className="ml-2 text-gray-600">hrgp</span>
                            </div>
                            <Button variant="secondary" size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                            </Button>
                        </div>
                    </div>

                    {/* Company Job Openings */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold mb-2">Company Job Openings</h3>
                        <div className="flex items-center border rounded-md p-2 justify-between bg-gray-50">
                            <div className="flex items-center">
                                <span className="text-gray-600">https://hrgp.io/app/jobOpenings/</span>
                                <span className="ml-2 text-gray-600">hrgp</span>
                            </div>
                            <Button variant="secondary" size="sm" className="bg-teal-600 text-white hover:bg-teal-700">
                                <Copy className="h-4 w-4 mr-1" />
                                Copy
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Location(s) Section */}
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
            </Card>
        </TabsContent>
    );
};

export default CompanyProfileTab;