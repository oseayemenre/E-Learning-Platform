import { type Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../app/globals.css";
import React from "react";
import Nav from "@/components/main/navigation";

export const metadata: Metadata = { title: "Lernix" };
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body className={`flex ${poppins.className} bg-[#e5e5e5] h-full`}>
        <Nav />
        <div className="w-full">{children}</div>
      </body>
    </html>
  );
};
export default RootLayout;
