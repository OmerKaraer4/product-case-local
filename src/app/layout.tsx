import type { Metadata } from "next";
import "./../styles/globals.css";

export const metadata: Metadata = {
  title: "Product Case",
  description: "Full-stack product listing case study",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-zinc-50 text-zinc-900">
        {children}
      </body>
    </html>
  );
}
