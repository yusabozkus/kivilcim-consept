"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { collectiveStats } from "@/constants/brand";

const process = ["Research", "Prototype", "Release"];

export default function Hero() {
  return (
    <section id="home" className="bg-[#090d18] px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
      <div className="mx-auto max-w-[1480px] overflow-hidden rounded-[28px] border border-white/10 bg-[#f1eee6]">
        <div className="grid min-h-[760px] lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative flex flex-col justify-between px-6 pb-10 pt-32 sm:px-10 sm:pt-40 lg:px-16 lg:pb-14">
            <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(#101522_1px,transparent_1px),linear-gradient(90deg,#101522_1px,transparent_1px)] [background-size:48px_48px]" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative z-10 max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 border-l-2 border-primary pl-3 text-[11px] font-black uppercase tracking-[0.2em] text-[#101522]/50">
                Independent creative technology collective
              </div>
              <h1 className="mt-8 max-w-[920px] text-[clamp(4rem,8.3vw,8.4rem)] font-black leading-[0.82] tracking-[-0.075em] text-[#101522]">
                Build what
                <span className="block">matters</span>
                <span className="block text-primary">together.</span>
              </h1>
              <p className="mt-9 max-w-xl text-base leading-8 text-[#101522]/55 sm:text-lg">
                A hands-on collective where designers, developers, and
                researchers turn public-interest questions into useful,
                testable products.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() =>
                    document
                      .querySelector("#our-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#101522] px-6 font-extrabold text-white transition-transform hover:-translate-y-0.5"
                >
                  Explore our work <ArrowDown className="size-4" />
                </button>
                <Link
                  href="/register"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-xl border border-[#101522]/15 px-6 font-extrabold text-[#101522] transition-colors hover:bg-white/60"
                >
                  Join the collective <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </motion.div>

            <div className="relative z-10 mt-16 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.16em] text-[#101522]/35">
              <span>Istanbul</span>
              <span className="h-px w-10 bg-[#101522]/15" />
              <span>Remote friendly</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative min-h-[600px] overflow-hidden bg-primary p-6 text-white sm:p-9 lg:min-h-full"
          >
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
            <div className="absolute -right-28 top-24 size-[430px] rounded-full border-[72px] border-[#101522]/12" />
            <div className="absolute -bottom-24 -left-20 size-72 rounded-full bg-[#6c5ce7] mix-blend-multiply blur-2xl" />

            <div className="relative z-10 flex h-full min-h-[540px] flex-col justify-between lg:min-h-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/65">
                    Kıvılcım / Studio system
                  </p>
                  <p className="mt-2 font-mono text-xs text-white/45">EST. 2025 — IST</p>
                </div>
                <Asterisk className="size-12 stroke-[1.2]" />
              </div>

              <div className="mx-auto w-full max-w-md">
                <div className="relative mx-auto grid aspect-square w-[78%] place-items-center rounded-full border border-white/35 bg-[#101522] shadow-2xl shadow-[#6c2b14]/25">
                  <div className="absolute inset-5 rounded-full border border-dashed border-white/20" />
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">Our method</p>
                    <p className="mt-4 text-4xl font-black leading-[0.9] tracking-[-0.05em] sm:text-5xl">
                      MAKE<br />TEST<br /><span className="text-primary">SHARE</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-2">
                  {process.map((step, index) => (
                    <div key={step} className="rounded-xl border border-white/25 bg-white/10 p-3 backdrop-blur-sm">
                      <p className="font-mono text-[10px] text-white/50">0{index + 1}</p>
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.1em]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="max-w-sm text-sm font-semibold leading-6 text-white/70">
                Small teams. Open process. Work that earns its place in the world.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 border-t border-white/10 bg-[#101522] text-white lg:grid-cols-4">
          {collectiveStats.map((stat) => (
            <div key={stat.label} className="border-white/10 px-6 py-6 even:border-l lg:border-l lg:first:border-l-0">
              <p className="text-2xl font-black sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
