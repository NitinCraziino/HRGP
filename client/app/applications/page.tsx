"use client";

import type React from "react";

import { useState } from "react";
import { Search, UserRoundPlusIcon } from "lucide-react";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import { Button } from "@/components/ui/button";
import { Input, DatePicker } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

const CandidatesPage = () => {
    const [activeOnly, setActiveOnly] = useState(true);

    return (
        <>
            <PrivateContainer>
                <div className=" bg-white rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4 pt-4">
                        <div className="relative pl-4">
                            <Input placeholder="Search..." className="w-[380px] pr-9 h-10" />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>

                        <Select defaultValue="all">
                            <SelectTrigger className="w-[380px] h-10 border-gray-200">
                                <span className="flex items-center text-gray-600">Filter by job</span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Jobs</SelectItem>
                                <SelectItem value="remote">Remote Jobs</SelectItem>
                                <SelectItem value="onsite">Onsite Jobs</SelectItem>
                            </SelectContent>
                        </Select>

                        <DatePicker placeholder="Start date" showIcon={false} className="w-[220px] h-10 border-gray-200" />

                        <DatePicker placeholder="End date" showIcon={false} className="w-[220px] h-10 border-gray-200" />

                        <div className="flex items-center gap-2 ml-auto">
                            <Switch checked={activeOnly} onCheckedChange={setActiveOnly} className="data-[state=checked]:bg-blue-500" />
                            <span className="text-sm">Active Candidates</span>
                        </div>

                        <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4">
                            <UserRoundPlusIcon className="mr-2 h-4 w-4" /> Add Candidate
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-gray-200 bg-green-500 hover:bg-green-600 text-white  mr-4"
                        >
                            <Image src="/assets/icons/refresh.svg" alt="refresh" width={20} height={20} />
                        </Button>
                    </div>

                    <div className="overflow-x-auto">

                    </div>
                </div>
            </PrivateContainer>
        </>
    );
};

export default CandidatesPage;



// < table className = "w-full border-collapse" >
//           <thead>
//             <tr className="text-left border-b">
//               <th className="p-3 w-10">
//                 <Checkbox />
//               </th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Name <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Email <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Phone <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Ratings <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Date <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Title <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">Tags</th>
//               <th className="p-3 font-medium">
//                 <div className="flex items-center">
//                   Code <ChevronDown className="ml-1 h-4 w-4" />
//                 </div>
//               </th>
//               <th className="p-3 font-medium">Progress</th>
//               <th className="p-3 font-medium">Status</th>
//               <th className="p-3 font-medium">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((candidate) => (
//               <tr key={candidate.id} className="border-b hover:bg-gray-50">
//                 <td className="p-3">
//                   <Checkbox />
//                 </td>
//                 <td className="p-3">
//                   <div className="flex items-center gap-2">
//                     <span className="text-blue-600 font-medium">{candidate.name}</span>
//                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-green-100 text-green-600">
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </td>
//                 <td className="p-3">{candidate.email}</td>
//                 <td className="p-3">{candidate.phone}</td>
//                 <td className="p-3">{candidate.rating}</td>
//                 <td className="p-3">{candidate.date}</td>
//                 <td className="p-3">{candidate.title}</td>
//                 <td className="p-3">
//                   <div className="flex flex-col gap-1">
//                     {candidate.tags.map((tag, index) => (
//                       <Badge key={index} variant="secondary" className="bg-blue-900 text-white whitespace-nowrap">
//                         {tag} <span className="ml-1 cursor-pointer">×</span>
//                       </Badge>
//                     ))}
//                     {candidate.tags.length === 0 && <span className="text-gray-500">Enter Tags</span>}
//                   </div>
//                 </td>
//                 <td className="p-3">{candidate.code}</td>
//                 <td className="p-3">
//                   <div className="flex items-center gap-2">
//                     <span>
//                       {candidate.progress.completed}/{candidate.progress.total}
//                     </span>
//                     <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-green-500 rounded-full"
//                         style={{ width: `${(candidate.progress.completed / candidate.progress.total) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-3">{candidate.status}</td>
//                 <td className="p-3">
//                   <div className="flex gap-1">
//                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-green-100 text-green-600">
//                       <MessageCircle className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600"
//                     >
//                       <Menu className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-teal-100 text-teal-600">
//                       <Send className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </ >;