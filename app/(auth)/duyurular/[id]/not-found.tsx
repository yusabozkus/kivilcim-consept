"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <header className="w-full py-4 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <nav className="m-auto max-w-[1200px] px-6 w-full h-full flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-3 sm:gap-4">
            <Logo />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
              KIVILCIM
            </h1>
          </div>
        </nav>
      </header>

      <div className="max-w-[1200px] m-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Story not found
          </h1>
          <p className="text-neutral-600 mb-8">
            The story you are looking for may have been removed or never existed.
          </p>
          <Button asChild className="rounded-full px-8 py-6">
            <Link href="/journal">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to journal
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
