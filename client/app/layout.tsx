import { Geist } from "next/font/google";
import "../styles/globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import NavBar from "@/components/layout/NavBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { RootLayoutProps } from "@/types/props";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <QueryProvider>
          <Header />
          <NavBar />
          {children}
          <Footer />
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