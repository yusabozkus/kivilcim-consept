"use client";

import AboutUs from "@/components/landing/AboutUs";
import Announcements from "@/components/landing/Announcements";
import ContactUs from "@/components/landing/ContactUs";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import OurWorks from "@/components/landing/OurWorks";
import WhatWeDo from "@/components/landing/WhatWeDo";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";
import { Announcement } from "@/lib/actions/announcements.actions";
import { Work } from "@/lib/actions/work.actions";

type Session = typeof auth.$Infer.Session;

type LandingClientProps = {
  session: Session | null;
  announcements: {
    data: Announcement[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  works: {
    data: Work[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export default function LandingClient({
  session,
  announcements,
  works
}: LandingClientProps) {
  return (
    <main className="min-h-screen w-full bg-[#f7f4ed]">
      <div className="overflow-x-hidden">
        <Header session={session} />
        <Hero />
        <section className="bg-[#f7f4ed] px-4 py-24 sm:px-6 lg:py-32">
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black leading-[1.03] tracking-[-0.045em] text-[#101522] sm:text-6xl lg:text-7xl"
            >
              Good ideas become useful when the right people build them together.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:pl-10"
            >
              <p className="section-kicker text-primary">What is Kıvılcım?</p>
              <p className="mt-5 text-base leading-8 text-[#101522]/55 sm:text-lg">
                We find questions worth solving, bring different disciplines to
                the same table, and test ideas in the real world. We believe in
                working prototypes before polished presentations.
              </p>
            </motion.div>
          </div>
        </section>
        <WhatWeDo />
        <AboutUs />
        <OurWorks works={works} />
        <Announcements announcements={announcements} />
        <ContactUs />
        <Footer />
      </div>
    </main>
  );
}
