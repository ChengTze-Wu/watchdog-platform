"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Chip, Spacer } from "@heroui/react";
import { HiBellAlert, HiOutlineBellAlert } from "react-icons/hi2";
import { IoPhonePortraitOutline, IoPhonePortrait } from "react-icons/io5";
import { FaShieldDog } from "react-icons/fa6";
import { GoHomeFill, GoHome } from "react-icons/go";

import SettingModal from "@/components/platform/setting-modal";

export const sidebarItems = [
  {
    name: "首頁",
    href: "/platform",
    icon: GoHome,
    choosenIcon: GoHomeFill,
  },
  {
    name: "所有裝置",
    href: "/platform/devices",
    icon: IoPhonePortraitOutline,
    choosenIcon: IoPhonePortrait,
  },
  {
    name: "警報器",
    href: "/platform/senders",
    icon: HiOutlineBellAlert,
    choosenIcon: HiBellAlert,
  },
  {
    name: "版本資訊",
    href: "/platform/release-notes",
    icon: HiOutlineBellAlert,
    choosenIcon: HiBellAlert,
    hidden: true,
  },
];

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const version = process.env.NEXT_PUBLIC_VERSION || "dev";

  return (
    <div className={clsx("grid grid-rows-[auto,1fr,auto] w-64 p-4", className)}>
      <div className="text-lg flex items-center justify-start h-12 p-2 mb-16">
        <FaShieldDog className="w-8 h-8" />
        <Spacer />
        <h1>吳家看門狗</h1>
        <Spacer />
        <Link href="/platform/release-notes" className="flex items-center">
          <Chip size="sm" variant="dot" color="secondary">
            {version}
          </Chip>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {sidebarItems.map((item, index) =>
          item.hidden ? null : (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                "w-full rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors",
                item.href === pathname && "bg-zinc-200 dark:bg-zinc-800"
              )}
            >
              <div className="flex items-center justify-start h-10 text-small p-2">
                {item.href === pathname ? (
                  <item.choosenIcon className="w-5 h-5" />
                ) : (
                  <item.icon className="w-5 h-5" />
                )}
                <Spacer />
                {item.name}
              </div>
            </Link>
          )
        )}
      </div>
      <SettingModal />
    </div>
  );
}
