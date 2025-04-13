import { Geist } from "next/font/google";
import "../styles/globals.css";
import { RootLayoutProps } from "@/types/props";
import Providers from "@/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased overflow-auto`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
};


export { metadata } from "./metadata";
export default RootLayout;