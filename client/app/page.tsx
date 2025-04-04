import PrivateContainer from "@/components/hoc/PrivateContainer";

const page = () => {
  return (
    <PrivateContainer>
      <div>page</div>
    </PrivateContainer>
  );
};

export default page;