import { type Metadata } from "next";
import { Poppins } from "next/font/google";
import "../../app/globals.css";
import React from "react";
import Nav from "@/components/main/navigation";
import { UserContextProvider } from "@/context/user.context";
import { Toaster } from "react-hot-toast";
import { PinnedPostProvider } from "@/context/pinned-post,context";

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
        <Toaster position="top-center" />
        <UserContextProvider>
          <PinnedPostProvider>
            <Nav />
            <div className="w-full">{children}</div>
          </PinnedPostProvider>
        </UserContextProvider>
      </body>
    </html>
  );
};
export default RootLayout;
