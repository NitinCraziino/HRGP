import PrivateContainer from "@/components/hoc/PrivateContainer";
import TemplatesList from "@/components/page-components/templates/TemplatesList";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Template } from "@/types";

const templates: Template[] = [
  {
    id: "1",
    name: "Email Template 1",
    content: "Email Template 1 content",
    type: "email",
  },
  {
    id: "2",
    name: "Email Template 2",
    content: "Email Template 2 content",
    type: "email",
  },
  {
    id: "3",
    name: "Email Template 3",
    content: "Email Template 3 content",
    type: "email",
  },
];

const page = () => {
  return (
    <PrivateContainer className="pb-80">
      <div className="p-6 space-y-6 bg-white rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Templates</h1>
          <Link href="/add-template">
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-xs">
              Add New Template
            </Button>
          </Link>
        </div>

        <TemplatesList templates={templates} />
      </div>
    </PrivateContainer>
  );
};

export default page;
