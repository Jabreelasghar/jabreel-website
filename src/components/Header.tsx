"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation } from "@/lib/navigation";
import { Container } from "./Container";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg font-semibold text-ink">Dr Jabreel Asghar</span>
          <span className="text-xs font-medium text-ink/55">AI governance and digital education</span>
        </Link>
        <button
          type="button"
          className="rounded-md border border-line px-3 py-2 text-sm font-semibold text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          Menu
        </button>
        <nav
          id="site-navigation"
          className={`${open ? "absolute left-0 top-full block w-full border-b border-line bg-paper px-5 py-4" : "hidden"} lg:static lg:block lg:w-auto lg:border-0 lg:bg-transparent lg:p-0`}
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-sm px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-white text-moss shadow-sm" : "text-ink/70 hover:bg-white hover:text-ink"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </Container>
    </header>
  );
}
