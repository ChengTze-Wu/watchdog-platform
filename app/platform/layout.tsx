import Sidebar from "@/components/platform/sidebar";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
