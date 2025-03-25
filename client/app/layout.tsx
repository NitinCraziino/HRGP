import { Geist } from "next/font/google";
import "../styles/globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import NavBar from "@/components/layout/NavBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        </QueryProvider>
      </body>
    </html>
  );
}


export { metadata } from "./metadata";