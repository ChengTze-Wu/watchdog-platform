"use client";

import clsx from "clsx";
import Link from "next/link";

import { HiOutlineDevicePhoneMobile, HiBellAlert } from "react-icons/hi2";
import { FaShieldDog } from "react-icons/fa6";

import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarItems = [
    {
      name: "裝置列表",
      href: "/platform/devices",
      icon: HiOutlineDevicePhoneMobile,
    },
    { name: "警報器", href: "/platform/alerts", icon: HiBellAlert },
  ];

  return (
    <div className="grid grid-rows-[auto,1fr,auto] w-64 min-h-screen p-3 text-white border-r border-zinc-800">
      <div className="text-lg flex items-center justify-start h-12 p-2">
        <FaShieldDog className="mr-2 w-6 h-6" />
        <span>吳家看門狗</span>
      </div>
      <div className="flex flex-col gap-1 mt-16">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={clsx(
              "w-full rounded-xl hover:bg-zinc-800",
              item.href.startsWith(pathname) && "bg-zinc-700"
            )}
          >
            <div className="flex items-center justify-start h-10 text-small p-2">
              {item.icon && <item.icon className="mr-2 w-5 h-5" />}
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-start"></div>
    </div>
  );
}
