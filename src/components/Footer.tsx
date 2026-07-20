import Link from "next/link";
import { navigation, secondaryNavigation } from "@/lib/navigation";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-oxford bg-oxford text-white">
      <Container className="grid gap-8 py-10 md:grid-cols-[1.1fr_2fr]">
        <div>
          <p className="font-serif text-xl font-semibold">Dr Jabreel Asghar</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-white/68">
            Assessment Quality • Responsible AI • Higher Education
          </p>
        </div>
        <div className="grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2 md:border-t-0 md:pt-0 lg:grid-cols-3">
          {[...navigation, ...secondaryNavigation].map((item) => (
            <Link key={item.href} className="text-sm font-medium text-white/68 transition hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
