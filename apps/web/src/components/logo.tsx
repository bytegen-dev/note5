"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Logo() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to handle system theme preference
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
      <Image
        src={isDark ? "/logo-white.png" : "/logo-black.png"}
        alt="note5"
        width={120}
        height={40}
        className="h-8 w-auto"
        priority
      />
    </Link>
  );
}

