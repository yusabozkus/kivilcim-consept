"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { navItems } from "@/constants/brand";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#090d18] px-4 pb-8 pt-16 text-white sm:px-6 lg:pt-20">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Logo />
              <span className="text-xl font-black tracking-[0.2em]">KIVILCIM</span>
            </Link>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/45">
              An independent collective for creative technology, open learning, and social impact.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/30">Explore</p>
              <ul className="mt-5 space-y-3">
                {navItems.slice(1, 4).map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-sm text-white/65 transition-colors hover:text-primary"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/30">Platform</p>
              <ul className="mt-5 space-y-3 text-sm text-white/65">
                <li><Link href="/register" className="hover:text-primary">Application</Link></li>
                <li><Link href="/login" className="hover:text-primary">Studio login</Link></li>
                <li><Link href="/journal" className="hover:text-primary">All stories</Link></li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/30">Contact</p>
              <a
                href="mailto:hello@kivilcim.community"
                className="mt-5 block text-sm text-white/65 transition-colors hover:text-primary"
              >
                hello@kivilcim.community
              </a>
              <p className="mt-3 text-sm text-white/35">Istanbul · Türkiye</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kıvılcım Creative Collective</p>
          <p>
            Designed and developed by <strong className="text-white/65">Yuşa Bozkuş</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
