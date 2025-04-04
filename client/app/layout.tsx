import { Geist } from "next/font/google";
import "../styles/globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import PublicNavBar from "@/components/layout/PublicNavBar";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { Toaster } from "@/components/ui/sonner";
import { RootLayoutProps } from "@/types/props";
import PrivateNavBar from "@/components/layout/PrivateNavBar";
import PrivateFooter from "@/components/layout/PrivateFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased `}
      >
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        />
        <QueryProvider>
          <PublicHeader />
          <PublicNavBar />
          <PrivateNavBar />
          {children}
          <PrivateFooter />
          <PublicFooter />
          <Toaster
            position="top-right"
            richColors
            duration={3000}
          />
        </QueryProvider>
      </body>
    </html>
  );
};


export { metadata } from "./metadata";
export default RootLayout;