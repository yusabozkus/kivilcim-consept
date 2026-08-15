"use client";

import { motion } from "framer-motion";
import { focusAreas } from "@/constants/brand";

export default function WhatWeDo() {
  return (
    <section id="capabilities" className="bg-[#090d18] px-4 py-24 text-white sm:px-6 lg:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-kicker text-primary">What we do</p>
            <h2 className="mt-5 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              From a sharp question to a working prototype.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl text-base leading-8 text-white/50 lg:ml-auto lg:text-lg"
          >
            Kıvılcım is not an agency. It is a shared production space where
            different disciplines work on the same question. Every project
            moves through research, design, technology, and open reflection.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-16 grid overflow-hidden rounded-3xl border border-white/10 md:grid-cols-2 lg:grid-cols-3"
        >
          {focusAreas.map((area) => {
            const Icon = area.icon;
            return (
              <motion.article
                key={area.number}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                className="group min-h-[330px] border-b border-white/10 bg-white/[0.025] p-7 transition-colors hover:bg-white/[0.06] md:border-r lg:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/30">{area.number}</span>
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-primary transition-transform group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                </div>
                <div className="mt-20">
                  <h3 className="text-2xl font-bold tracking-[-0.025em]">
                    {area.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {area.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
