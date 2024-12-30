"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiOutlineDevicePhoneMobile, HiBellAlert } from "react-icons/hi2";
import { FaShieldDog } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";

import ThemeSwitcher from "@/components/common/theme-switcher";

export const sidebarItems = [
  {
    name: "首頁",
    href: "/platform",
    icon: GoHomeFill,
  },
  {
    name: "所有裝置",
    href: "/platform/devices",
    icon: HiOutlineDevicePhoneMobile,
  },
  { name: "警報器", href: "/platform/senders", icon: HiBellAlert },
];

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div
      className={clsx(
        "grid grid-rows-[auto,1fr,auto] w-64 p-4 border-r dark:border-default-100",
        className
      )}
    >
      <div className="text-lg flex items-center justify-start h-12 p-2">
        <FaShieldDog className="mr-2 w-8 h-8" />
        <h1>吳家看門狗</h1>
      </div>
      <div className="flex flex-col gap-1 mt-14">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={clsx(
              "w-full rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors",
              item.href === pathname && "bg-zinc-200 dark:bg-zinc-800"
            )}
          >
            <div className="flex items-center justify-start h-10 text-small p-2">
              {item.icon && <item.icon className="mr-2 w-5 h-5" />}
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-start">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
