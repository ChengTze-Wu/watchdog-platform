"use client";

import { usePathname } from "next/navigation";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";

import { sidebarItems } from "@/components/platform/sidebar";

export default function PlatformBreadcrumbs({
  className,
}: Readonly<{ className?: string }> = {}) {
  const pathname = usePathname();

  const item = sidebarItems.find((item) => pathname === item.href);

  return (
    <Breadcrumbs className={className} variant="solid" radius="lg">
      {item?.href !== "/platform" && (
        <BreadcrumbItem href="/platform">首頁</BreadcrumbItem>
      )}
      {item && <BreadcrumbItem href={item.href}>{item.name}</BreadcrumbItem>}
    </Breadcrumbs>
  );
}
