import PrivateContainer from "@/components/hoc/PrivateContainer";
import EditRoleForm from "@/components/page-components/roles-permission/EditRoleForm";

const role = {
  id: "1",
  name: "Company Admin",
  isOn: true,
  hasHelp: true,
  permissions: {
    ATS: "Full Access",
    EMS: "Full Access",
    FILES: "Full Access",
    TOOLS: "Full Access",
  },
};

const page = async ({ params }: { params: Promise<{ permissionId: string }> }) => {
  const { permissionId } = await params;
  return (
    <PrivateContainer title="Edit Roles and Permissions">
      <EditRoleForm role={role} />
    </PrivateContainer>
  );
};

export default page;
