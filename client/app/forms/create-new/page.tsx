import PrivateContainer from "@/components/hoc/PrivateContainer";
import AddNewForm from "@/components/page-components/form-builder/AddNewForm";
import FormBuilder from "@/components/page-components/form-builder/FormBuilder";

const page = () => {
  return (
    <PrivateContainer>
      <div className="p-6 space-y-6 bg-white rounded-lg">
        <AddNewForm />
        <FormBuilder />
      </div>
    </PrivateContainer>
  );
};

export default page;
