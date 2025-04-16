import PrivateContainer from "@/components/hoc/PrivateContainer";

const page = () => {
  return (
    <PrivateContainer>
      <div className=" bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4 pt-4">
          <div>page</div>
        </div>
      </div>
    </PrivateContainer>
  );
};

export default page;
