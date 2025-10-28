"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { navItems } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Logo from "../Logo";
import { auth } from "@/lib/auth";

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" as const },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const mobileNavVariants = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    x: "100%",
    transition: { duration: 0.4, ease: "easeIn" as const },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: 50 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.4,
      ease: "easeOut" as const,
    },
  }),
};

type Session = typeof auth.$Infer.Session;

const Header = ({ session }: { session: Session | null }) => {
  const [activeSection, setActiveSection] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const item of navItems) {
        const section = document.querySelector(item.id);
        if (section) {
          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;
          const sectionBottom = sectionTop + section.clientHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        className="w-full py-4 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 bg-[#ffffff4d] backdrop-blur-xl z-50"
        variants={headerVariants}
        initial="hidden"
        animate="show"
      >
        <nav className="m-auto max-w-default w-full h-full flex flex-row items-center justify-between">
          <Link href={"/"}>
            <motion.div
              className="flex flex-row items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            >
              <Logo />
              <h1 className="text-xl lg:text-2xl font-extrabold">
                Türk'ün Kanadı
              </h1>
            </motion.div>
          </Link>

          <ul className="hidden lg:flex flex-row items-end gap-7 text-base font-normal">
            {navItems.map((item, i) => (
              <motion.li
                key={item.id}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="show"
              >
                <button
                  className={`transition-all ease-linear ${
                    activeSection === item.id
                      ? "text-primary"
                      : "hover:text-primary"
                  }`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </motion.li>
            ))}
          </ul>

          {session?.user && (
            <motion.div
              className="hidden lg:flex flex-row gap-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            >
              <Button
                asChild
                className="rounded-lg px-6 py-5 border border-primary hover:bg-transparent hover:text-primary transition-all ease-linear"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </motion.div>
          )}

          {!session?.user && (
            <>
              <motion.div
                className="hidden lg:flex flex-row gap-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
              >
                <Button
                  asChild
                  className="rounded-lg px-6 py-5 border border-primary hover:bg-transparent hover:text-primary transition-all ease-linear"
                >
                  <Link href="/login">Giriş Yap</Link>
                </Button>
                <Button
                  asChild
                  className="rounded-lg px-6 py-5 bg-neutral-200 text-black border border-neutral-200 hover:bg-transparent hover:text-primary hover:border-primary transition-all ease-linear"
                >
                  <Link href="/register">Aramıza Katıl!</Link>
                </Button>
              </motion.div>
            </>
          )}

          <motion.button
            className="lg:hidden p-2 hover:bg-black/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col"
              variants={mobileNavVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z"
                      fill="#FF4D00"
                    />
                  </svg>
                  <h2 className="text-lg font-semibold">Türk'ün Kanadı</h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 flex flex-col justify-between p-6">
                <nav className="space-y-2">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      custom={i}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="show"
                    >
                      <button
                        className={`w-full text-left py-4 px-4 rounded-xl text-xl font-medium transition-all ${
                          activeSection === item.id
                            ? "text-primary bg-primary/5"
                            : "hover:text-primary hover:bg-gray-50"
                        }`}
                        onClick={() => scrollToSection(item.id)}
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="space-y-4 pt-6 border-t border-gray-100"
                  custom={navItems.length}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="show"
                >
                  {!session?.user ? (
                    <>
                      <Button
                        className="w-full rounded-xl py-6 text-base font-medium border border-primary hover:bg-transparent hover:text-primary transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                        asChild
                      >
                        <Link href={"/login"}>Giriş Yap</Link>
                      </Button>
                      <Button
                        className="w-full rounded-xl py-6 text-base font-medium bg-neutral-200 text-black border border-neutral-200 hover:bg-transparent hover:text-primary hover:border-primary transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Link href="/register">Aramıza Katıl!</Link>
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full rounded-xl py-6 text-base font-medium border border-primary hover:bg-transparent hover:text-primary transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                      asChild
                    >
                      <Link href={"/dashboard"}>Dashboard</Link>
                    </Button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
