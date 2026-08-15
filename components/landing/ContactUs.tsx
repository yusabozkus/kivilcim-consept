"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MessageCircle, UsersRound } from "lucide-react";

export default function ContactUs() {
  return (
    <section id="contact" className="bg-[#f7f4ed] px-4 py-24 sm:px-6 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-[#6c5ce7] px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-20 lg:py-24"
      >
        <div className="absolute -right-24 -top-32 size-[420px] rounded-full border-[64px] border-white/10" />
        <div className="absolute -bottom-24 left-[40%] size-72 rounded-full bg-primary/40 blur-3xl" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
          <div>
            <p className="section-kicker text-white/60">Build with us</p>
            <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Have a spark worth following?
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Bring a project idea, a skill you want to share, or simply a
              strong curiosity. There is a seat for you at the table.
            </p>
          </div>

          <div className="grid gap-3">
            <Link
              href="/register"
              className="flex items-center justify-between rounded-2xl bg-white px-5 py-5 font-black text-[#101522] transition-transform hover:-translate-y-1"
            >
              <span className="flex items-center gap-3">
                <UsersRound className="size-5 text-primary" />
                Start your application
              </span>
              <ArrowUpRight className="size-5" />
            </Link>
            <a
              href="mailto:hello@kivilcim.community"
              className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 px-5 py-5 font-bold backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              <span className="flex items-center gap-3">
                <Mail className="size-5" />
                hello@kivilcim.community
              </span>
              <MessageCircle className="size-5" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
