import { Template } from "@/types";
import TemplateForm from "@/components/page-components/templates/TemplateForm";

const templates: Template[] = [
  {
    id: "1",
    name: "Text Template 1",
    content: "Text Template 1 content",
    type: "text",
  },
  {
    id: "2",
    name: "Text Template 2",
    content: "Text Template 2 content",
    type: "text",
  },
];

const page = async ({ params }: { params: Promise<{ templateId: string }> }) => {
  const { templateId } = await params;
  const template = templates.find((t) => t.id === templateId);

  return <TemplateForm initialData={template} isEditing={true} />;
};

export default page;
