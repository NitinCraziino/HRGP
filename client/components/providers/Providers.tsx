import { WrapperProps } from "@/types/props";
import PrivateNavBar from "../layout/PrivateNavBar";
import PublicFooter from "../layout/PublicFooter";
import PublicHeader from "../layout/PublicHeader";
import PublicNavBar from "../layout/PublicNavBar";
import LoadingOverlay from "../LoadingOverlay";
import { Toaster } from "../ui/sonner";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: WrapperProps) => {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <QueryProvider>
        <PublicHeader />
        <PublicNavBar />
        <PrivateNavBar />
        {children}
        <LoadingOverlay />
        <PublicFooter />
        <Toaster position="top-right" richColors duration={3000} />
      </QueryProvider>
    </>
  );
};

export default Providers;
