"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CircleCheck, MoveUpRight } from "lucide-react";
import { collectiveStats } from "@/constants/brand";

const principles = [
  "Open process, shared knowledge",
  "Small cross-disciplinary teams",
  "Questions rooted in real needs",
  "Fast prototypes, honest feedback",
];

export default function AboutUs() {
  return (
    <section id="about-us" className="bg-[#f7f4ed] px-4 py-24 sm:px-6 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative min-h-[560px] overflow-hidden rounded-[32px] bg-[#101522] p-7 text-white sm:p-10"
        >
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="absolute -right-24 -top-24 size-80 rounded-full border-[56px] border-primary/80" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35">
                Collective profile / 2026
              </p>
              <MoveUpRight className="size-5 text-primary" />
            </div>

            <div className="my-16">
              <p className="max-w-lg text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                Different disciplines. One shared table.
              </p>
              <div className="mt-10 flex flex-wrap gap-2">
                {["DESIGN", "CODE", "RESEARCH", "STORY", "IMPACT"].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-3 py-2 text-[10px] font-black tracking-[0.14em] text-white/55">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-white/10 pt-7 sm:grid-cols-4">
              {collectiveStats.map((stat) => (
                <div key={stat.label} className="mb-4 pr-3">
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="mt-1 text-[11px] leading-4 text-white/35">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col justify-center lg:pl-8"
        >
          <p className="section-kicker text-primary">Who we are</p>
          <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.04em] text-[#101522] sm:text-6xl">
            Not one expertise. A shared momentum.
          </h2>
          <p className="mt-7 text-base leading-8 text-[#101522]/60 sm:text-lg">
            Kıvılcım is an independent creative technology collective where
            designers, developers, researchers, and storytellers build work
            with public value.
          </p>

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle} className="flex items-start gap-3 text-sm font-semibold">
                <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{principle}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-10 inline-flex w-fit items-center gap-2 font-extrabold text-[#101522] underline decoration-primary decoration-2 underline-offset-8"
          >
            See how to join <ArrowUpRight className="size-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
