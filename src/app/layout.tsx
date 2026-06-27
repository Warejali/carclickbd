import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import QueryProvider from "@/lib/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CarClickBD",
  description:
    "CarClickBD is a full-stack car auction platform designed for high performance, ease of use, and flexibility. It enables users to browse, bid, and win vehicles in real-time, while also giving sellers a powerful dashboard to manage listings, memberships, and sales. Whether you want to build a dealer-based car auction business or a multi-vendor marketplace, CarClickBD is a scalable and customizable solution.",
  keywords:
    "car auction, car auction platform, full-stack car auction, real-time bidding, vehicle listings, seller dashboard, membership management, multi-vendor marketplace, scalable solution, customizable solution",
  authors: [
    {
      name: "CarClickBD",
      url: "https://carclickbd.com",
    },
  ],
  creator: "CarClickBD",
  publisher: "CarClickBD",
  openGraph: {
    title: "CarClickBD",
    description:
      "CarClickBD is a full-stack car auction platform designed for high performance, ease of use, and flexibility. It enables users to browse, bid, and win vehicles in real-time, while also giving sellers a powerful dashboard to manage listings, memberships, and sales. Whether you want to build a dealer-based car auction business or a multi-vendor marketplace, CarClickBD is a scalable and customizable solution.",
    url: "https://carclickbd.com",
    siteName: "CarClickBD",
    images: [
      {
        url: "https://carclickbd.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CarClickBD",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Providers>{children}</Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
