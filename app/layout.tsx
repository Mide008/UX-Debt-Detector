import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UX Debt Detector | Professional UX Analysis",
  description: "Get transparent UX debt scores with practitioner notes and specific actions. Know exactly what to fix and why it matters.",
  keywords: "UX audit, UX debt, product design, user experience, UI analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
