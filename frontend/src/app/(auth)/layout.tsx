import { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { UserContextProvider } from "@/context/user.context";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Lernix",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-center" />
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  );
}
