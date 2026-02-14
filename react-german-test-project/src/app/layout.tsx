import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "German B1 Test Generator",
  description: "Practice for your telc B1 exam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
