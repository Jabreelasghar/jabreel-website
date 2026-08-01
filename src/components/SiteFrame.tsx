"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/thinklab")) {
    return <>{children}</>;
  }

  return <><Header /><main>{children}</main><Footer /></>;
}
