import type { Metadata } from "next";

import { Providers } from "@/app/providers";
import { AlertProvider } from "@/components/common/flash-alert";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "WatchDog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hans" className="dark">
      <body>
        <Providers>
          <AlertProvider>{children}</AlertProvider>
        </Providers>
      </body>
    </html>
  );
}
