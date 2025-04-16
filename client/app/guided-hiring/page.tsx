"use client";

import { DataTable } from "@/components/common/DataTable";
import PrivateContainer from "@/components/hoc/PrivateContainer";
import { Button } from "@/components/ui/button";
import React from "react";
import { Column } from "@/types/props";
import Link from "next/link";

type Workflow = {
  id: number;
  positionTitle: string;
  workflowName: string;
};

const workflows: Workflow[] = [
  {
    id: 1,
    positionTitle: "Web Developer",
    workflowName: "Web Developer Workflow",
  },
  {
    id: 2,
    positionTitle: "Software Engineer",
    workflowName: "Software Engineer Workflow",
  },
  {
    id: 3,
    positionTitle: "Product Manager",
    workflowName: "Product Manager Workflow",
  },
];

const columns: Column<Workflow>[] = [
  {
    header: "Position Title",
    accessorKey: "positionTitle",
    isSortable: true,
    sortKey: "positionTitle",
  },
  {
    header: "Workflow Title",
    accessorKey: "workflowName",
    isSortable: true,
    sortKey: "workflowName",
  },
];

const page = () => {
  return (
    <PrivateContainer className="pb-72">
      <div className="p-6 space-y-6 bg-white">
        <div className="flex justify-end items-center">
          <Link href="/guided-hiring/create-new">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs">
              Add Guided Workflow
            </Button>
          </Link>
        </div>

        <DataTable
          data={workflows}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyState="No workflows found"
          isLoading={false}
          error={null}
          onRetry={() => {}}
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
                icon: <i className="fas fa-copy" />,
                onClick: (workflow) => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/guided-hiring/${workflow.id}`,
                  );
                },
              },
            ],
          }}
        />
      </div>
    </PrivateContainer>
  );
};

export default page;
