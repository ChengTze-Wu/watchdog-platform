"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { Switch } from "@nextui-org/react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      aria-label="Toggle theme"
      color="default"
      defaultSelected={theme === "dark"}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      thumbIcon={theme === "light" ? <HiOutlineSun /> : <HiOutlineMoon />}
    />
  );
}
