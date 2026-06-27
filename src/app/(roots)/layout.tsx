"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/publiclayout/navbar";
import AppFooter from "../shared/footer/Footer";
import SecondaryNav from "@/components/publiclayout/navbar/SecondaryNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideFooterPaths = [
    "/user",
    "/my-products",
    "/live-auction",
    "/auction-comments",
  ];
  const shouldShowFooter = !hideFooterPaths.includes(pathname);

  return (
    <main>
      <Navbar/>
      <SecondaryNav />
      <div>
        {children}
      </div>
      {shouldShowFooter && <AppFooter />}
    </main>
  );
}
