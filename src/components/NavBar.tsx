"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Главная", href: "/" },
  { label: "О нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Блог", href: "/blog" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Контакты", href: "/contacts" },
];

export function NavBar() {
  return (
    <header className="w-full bg-gray-100 px-4 py-4">
      <nav className="container mx-auto flex items-center justify-between">
        <div className="logo">
          <Link href="/" className="text-xl font-medium">
            Бустлинкс
          </Link>
        </div>
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-gray-800 hover:text-gray-600 transition-colors"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
