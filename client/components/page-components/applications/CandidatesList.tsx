"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DataTable, type Column, type BulkAction } from "@/components/common/DataTable";
import MultipleSelector from "@/components/form-components/MultiSelect";
import { Option } from "@/components/form-components/MultiSelect";
import { ActionDropdown } from "@/components/page-components/applications/ActionDropDown";
import Link from "next/link";
import { LinkIcon } from "lucide-react";

type Candidate = {
  id: string;
  name: string;
  email: string;
  profile: string;
  phone: string;
  rating: number;
  date: string;
  title: string;
  tags: string[];
  code: string;
  progress: {
    completed: number;
    total: number;
  };
  status: string;
  isVerified?: boolean;
};

const CandidatesList = () => {
  const [tags, setTags] = useState<Option[]>([]);

  // Sample data based on the image
  const candidates: Candidate[] = [
    {
      id: "1",
      name: "With Noresume",
      email: "noresume@mailinator.com",
      profile: "/assets/images/profile.png",
      phone: "+12323009844",
      rating: 0.0,
      date: "04-09-2025",
      title: "DB ADMIN NEW",
      tags: [],
      code: "HRGP-JOB-027",
      progress: { completed: 1, total: 3 },
      status: "Applied",
    },
    {
      id: "2",
      name: "Vikrant Joshi",
      email: "vik@mailinator.com",
      phone: "+12323232323",
      rating: 0.0,
      date: "04-08-2025",
      title: "DB ADMIN NEW",
      profile: "/assets/images/profile.png",
      tags: [],
      code: "HRGP-JOB-027",
      progress: { completed: 20, total: 31 },
      status: "Applied",
    },
    {
      id: "3",
      name: "Nitin Gupta",
      email: "nitin2@mailinator.com",
      phone: "+12342342342",
      rating: 0.0,
      date: "02-27-2025",
      title: "Customer Service Remote",
      profile: "/assets/images/profile.png",
      tags: ["kjhkjh"],
      code: "HRGP-JOB-014",
      progress: { completed: 3, total: 25 },
      status: "Applied",
      isVerified: true,
    },
    {
      id: "4",
      name: "Customer Admin",
      email: "admin@mailinator.com",
      phone: "+12342340900",
      rating: 0.0,
      date: "02-27-2025",
      title: "Customer Service Remote",
      profile: "/assets/images/profile.png",
      tags: ["3/15 Video Interview requested by Brad Bartlett"],
      code: "HRGP-JOB-014",
      progress: { completed: 1, total: 3 },
      status: "Applied",
      isVerified: true,
    },
    {
      id: "5",
      name: "Customer Service",
      email: "cusRemote@mailinator.com",
      phone: "+12323289898",
      rating: 0.0,
      date: "02-27-2025",
      title: "Customer Service Remote",
      profile: "/assets/images/profile.png",
      tags: ["2/27 Video Interview requested by Brad Bartlett"],
      code: "HRGP-JOB-014",
      progress: { completed: 1, total: 3 },
      status: "Applied",
      isVerified: true,
    },
    {
      id: "6",
      name: "Test App",
      email: "test.app@mailinator.com",
      phone: "+13334344333",
      rating: 0.0,
      date: "02-24-2025",
      title: "Customer Service Remote",
      tags: ["3/15 Video Interview requested by Brad Bartlett", "3/17 Video Interview"],
      code: "HRGP-JOB-014",
      progress: { completed: 1, total: 5 },
      status: "Applied",
      isVerified: true,
      profile: "/assets/images/profile.png",
    },
  ];

  // Bulk actions
  const bulkActions: BulkAction<Candidate>[] = [
    {
      label: "Reject",
      onClick: (selectedItems) => {
        console.log("Rejecting candidates:", selectedItems);
      },
      className: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      label: "Update Tags",
      onClick: (selectedItems) => {
        console.log("Updating tags for candidates:", selectedItems);
      },
      className: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      label: "Bulk Delete Tags",
      onClick: (selectedItems) => {
        console.log("Deleting tags for candidates:", selectedItems);
      },
      className: "bg-indigo-600 hover:bg-indigo-700",
    },
  ];

  const handleAddNote = (candidate: Candidate) => {
    console.log("Add note for", candidate.name);
  };

  const handleAttach = (candidate: Candidate) => {
    console.log("Attach file for", candidate.name);
  };

  const handleTimeline = (candidate: Candidate) => {
    console.log("View timeline for", candidate.name);
  };

  const handleHistory = (candidate: Candidate) => {
    console.log("View application history for", candidate.name);
  };

  const handleEdit = (candidate: Candidate) => {
    console.log("Edit", candidate.name);
  };

  const handleHire = (candidate: Candidate) => {
    console.log("Hire", candidate.name);
  };

  const handleReject = (candidate: Candidate) => {
    console.log("Reject", candidate.name);
  };

  const columns: Column<Candidate>[] = [
    {
      header: "Name",
      accessorKey: "name",
      isSortable: true,
      sortKey: "name",
      cell: (candidate) => (
        <div className="flex items-center gap-2">
          {candidate.profile && (
            <Link href={candidate.profile}>
              <LinkIcon className="h-4 w-4 text-blue-500" />
            </Link>
          )}
          {candidate.name}
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      isSortable: true,
      sortKey: "email",
    },
    {
      header: "Phone",
      accessorKey: "phone",
      isSortable: true,
      sortKey: "phone",
    },
    {
      header: "Ratings",
      accessorKey: "rating",
      isSortable: true,
      sortKey: "rating",
      cell: (candidate) => candidate.rating.toFixed(2),
    },
    {
      header: "Date",
      accessorKey: "date",
      isSortable: true,
      sortKey: "date",
    },
    {
      header: "Title",
      accessorKey: "title",
      isSortable: true,
      sortKey: "title",
    },
    {
      header: "Tags",
      cell: (candidate) => (
        <div className="flex flex-col gap-1">
          <MultipleSelector
            className="max-w-40"
            options={[]}
            value={[
              {
                label: "Tag 1",
                value: "tag1",
              },
              {
                label: "Tag 2",
                value: "tag2",
              },
            ]}
            creatable={true}
            onChange={(value) => setTags(value)}
            placeholder="Enter Tags"
          />
        </div>
      ),
    },
    {
      header: "Code",
      accessorKey: "code",
      isSortable: true,
      sortKey: "code",
    },
    {
      header: "Progress",
      cell: (candidate) => (
        <div className="flex items-center gap-2">
          <div className="bg-gray-200 w-24 h-2 rounded-full overflow-hidden">
            <div
              className="bg-green-500 h-full"
              style={{
                width: `${(candidate.progress.completed / candidate.progress.total) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs text-gray-600">
            {candidate.progress.completed}/{candidate.progress.total}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "Action",
      cell: (candidate) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            <Image src="/assets/icons/chat.svg" alt="chat" width={16} height={16} />
          </Button>

          <ActionDropdown
            item={candidate}
            onNote={handleAddNote}
            onAttach={handleAttach}
            onTimeline={handleTimeline}
            onHistory={handleHistory}
            onEdit={handleEdit}
            onHire={handleHire}
            onReject={handleReject}
          />

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-green-500 text-white hover:bg-green-600"
          >
            <i className="fas fa-paper-plane"></i>
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto p-4">
      <DataTable
        data={candidates}
        columns={columns}
        keyExtractor={(item) => item.id}
        headerClassName="bg-gray-100"
        emptyState="No candidates found"
        selectable={true}
        bulkActions={bulkActions}
      />
    </div>
  );
};

export default CandidatesList;
