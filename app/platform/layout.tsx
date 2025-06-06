import { SignedIn, UserButton } from "@clerk/nextjs";

import Sidebar from "@/components/platform/sidebar";
import PlatformBreadcrumbs from "@/components/platform/breadcrumbs";
import Menu from "@/components/platform/menu";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar className="fixed top-0 left-0 h-full w-64 hidden lg:grid" />
      <div className="px-2 lg:px-4 flex flex-col flex-1 overflow-hidden lg:ml-64">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-1">
            <Menu className="lg:hidden" />
            <PlatformBreadcrumbs />
          </div>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
        <main>{children}</main>
      </div>
    </>
  );
}
