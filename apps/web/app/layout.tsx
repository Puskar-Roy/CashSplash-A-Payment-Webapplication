import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilProviders } from "../providers/RecoilProvider";
import { SessionProviders } from "../providers/SessionProvider";
import Navbar from "../components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CashSplash",
  description: "A Simple Secure Payment Application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilProviders>
          <SessionProviders>
            <Navbar />
            {children}
          </SessionProviders>
        </RecoilProviders>
      </body>
    </html>
  );
}
