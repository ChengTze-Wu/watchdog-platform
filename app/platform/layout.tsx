import Sidebar from "@/components/platform/sidebar";
import PlatformBreadcrumbs from "@/components/platform/breadcrumbs";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar className="fixed inset-y-0 left-0 shadow-sm" />
      <div className="flex-1 p-4 flex flex-col min-h-screen ml-64 overflow-hidden">
        <nav className="flex items-center justify-between mb-4">
          <PlatformBreadcrumbs />
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
