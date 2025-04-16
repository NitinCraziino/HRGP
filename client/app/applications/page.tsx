"use client";

import { useState } from "react";
import { Search, UserRoundPlusIcon } from "lucide-react";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import DatePicker from "@/components/form-components/DatePicker";
import CandidatesList from "@/components/page-components/applications/CandidatesList";

const ApplicationsPage = () => {
  const [activeOnly, setActiveOnly] = useState(true);

  return (
    <PrivateContainer>
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4 pt-4">
          <div className="relative pl-4">
            <Input placeholder="Search..." className="w-[380px] pr-9 h-10" />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-[380px] h-10 border-gray-200">
              <SelectValue placeholder="Filter by job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="remote">Remote Jobs</SelectItem>
              <SelectItem value="onsite">Onsite Jobs</SelectItem>
            </SelectContent>
          </Select>

          <DatePicker
            placeholder="Start date"
            showIcon={false}
            className="w-[220px] h-10 border-gray-200"
          />

          <DatePicker
            placeholder="End date"
            showIcon={false}
            className="w-[220px] h-10 border-gray-200"
          />

          <div className="flex items-center gap-2 ml-auto">
            <Switch
              checked={activeOnly}
              onCheckedChange={setActiveOnly}
              className="data-[state=checked]:bg-blue-500"
            />
            <span className="text-sm">Active Candidates</span>
          </div>

          <Button className="bg-indigo-600 hover:bg-indigo-700 h-10 px-4">
            <UserRoundPlusIcon className="mr-2 h-4 w-4" /> Add Candidate
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 border-gray-200 bg-green-500 hover:bg-green-600 text-white mr-4"
          >
            <Image src="/assets/icons/refresh.svg" alt="refresh" width={20} height={20} />
          </Button>
        </div>

        <CandidatesList />
      </div>
    </PrivateContainer>
  );
};

export default ApplicationsPage;
