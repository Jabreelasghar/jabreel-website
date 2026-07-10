import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <p className="font-serif text-xl font-semibold">Dr Jabreel Asghar</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
            University lecturer, AI governance researcher, and digital education strategist.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {navigation.map((item) => (
            <Link key={item.href} className="text-sm text-white/70 hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
