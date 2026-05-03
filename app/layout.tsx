import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/nav";
import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/components/modals/modal-provider";
import { SessionProvider } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "Urban Heritage | Redefining Street Culture",
  description:
    "Modern streetwear designed with respect for the past and vision for the future. Shop the latest drops, limited batches, and urban essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;500;600;700;800;900&family=Be+Vietnam+Pro:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-body text-on-background antialiased">
        <SessionProvider>
          <ModalProvider />
          <Navbar />
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
