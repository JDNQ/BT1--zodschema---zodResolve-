import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BT1 Auth",
  description: "Next.js + NestJS Auth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
