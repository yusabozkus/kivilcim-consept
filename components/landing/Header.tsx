"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { auth } from "@/lib/auth";
import { navItems } from "@/constants/brand";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

type Session = typeof auth.$Infer.Session;

export default function Header({ session }: { session: Session | null }) {
  const [activeSection, setActiveSection] = useState("#home");
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.querySelector(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.35;
      for (const item of navItems) {
        const section = document.querySelector(item.id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (marker >= top && marker < top + section.clientHeight) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav className="mx-auto flex h-[68px] max-w-[1480px] items-center justify-between rounded-2xl border border-white/10 bg-[#0d1222]/85 px-4 text-white shadow-2xl shadow-black/10 backdrop-blur-xl sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <div className="leading-none">
              <p className="text-base font-black tracking-[0.2em] sm:text-lg">
                KIVILCIM
              </p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/45">
                creative collective
              </p>
            </div>
          </Link>

          <ul className="hidden items-center gap-6 xl:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm transition-colors ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-white/65 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Button
              asChild
              variant="ghost"
              className="rounded-xl text-white/70 hover:bg-white/10 hover:text-white"
            >
              <Link href={session?.user ? "/dashboard" : "/login"}>
                {session?.user ? "Dashboard" : "Studio login"}
              </Link>
            </Button>
            {!session?.user && (
              <Button asChild className="rounded-xl px-5 font-bold">
                <Link href="/register" className="flex items-center gap-2">
                  Join the team <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="rounded-xl border border-white/10 p-2.5 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#090d18]/70 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="ml-auto flex h-full w-[88%] max-w-sm flex-col bg-[#f7f4ed] p-6 text-[#101522]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Logo />
                  <span className="font-black tracking-[0.18em]">KIVILCIM</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-black/10 p-2.5"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-14 flex flex-1 flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => scrollToSection(item.id)}
                    className="border-b border-black/10 py-4 text-left text-2xl font-bold"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <div className="grid gap-3">
                <Button asChild variant="outline" className="h-12 rounded-xl">
                  <Link href={session?.user ? "/dashboard" : "/login"}>
                    {session?.user ? "Dashboard" : "Studio login"}
                  </Link>
                </Button>
                {!session?.user && (
                  <Button asChild className="h-12 rounded-xl font-bold">
                    <Link href="/register">Join the team</Link>
                  </Button>
                )}
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
