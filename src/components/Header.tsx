"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, secondaryNavigation } from "@/lib/navigation";
import { Container } from "./Container";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ivory/96 backdrop-blur">
      <Container className="flex min-h-14 items-center justify-between gap-6 py-2">
        <Link href="/" className="w-[17rem] max-w-[62vw] leading-tight" onClick={() => setOpen(false)}>
          <span className="block font-serif text-lg font-semibold text-oxford">Dr Jabreel Asghar</span>
          <span className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] font-medium uppercase leading-4 tracking-[0.12em] text-slate">
            <span>AI Governance</span>
            <span>Higher Education Research</span>
          </span>
        </Link>
        <button
          type="button"
          className="rounded-sm border border-line px-3 py-1.5 text-sm font-semibold text-ink transition hover:border-moss hover:text-moss lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          Menu
        </button>
        <nav
          id="site-navigation"
          className={`${open ? "absolute left-0 top-full block w-full border-b border-line bg-ivory px-5 py-4" : "hidden"} lg:static lg:block lg:w-auto lg:border-0 lg:bg-transparent lg:p-0`}
        >
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b px-1 py-2 text-sm font-medium transition ${
                    active ? "border-moss text-oxford" : "border-transparent text-slate hover:border-line hover:text-oxford"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            {secondaryNavigation.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`border-b px-1 py-2 text-sm font-medium transition lg:hidden ${
                    active ? "border-moss text-oxford" : "border-transparent text-slate hover:border-line hover:text-oxford"
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
