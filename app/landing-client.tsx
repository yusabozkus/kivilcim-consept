'use client'

import AboutUs from "@/components/landing/AboutUs";
import Announcements from "@/components/landing/Announcements";
import ContactUs from "@/components/landing/ContactUs";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import OurWorks from "@/components/landing/OurWorks";
import WhatWeDo from "@/components/landing/WhatWeDo";
import React from "react";
import { motion, easeOut } from "framer-motion";
import Footer from "@/components/Footer";
import { auth } from "@/lib/auth";


type Session = typeof auth.$Infer.Session;

export default function LandingClient({
  session,
}: {
  session: Session | null;
}) {

    const textVariant = {
    hidden: { opacity: 0, y: 30 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeOut,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <main className="w-full h-full">
      <div className="overflow-x-hidden">
        <Header session={session} />
        <Hero />
        <div className="px-4 lg:px-0 max-w-default w-full mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <motion.h1
            className="flex-1 text-black/80 leading-tight cursor-default
      text-3xl md:text-4xl lg:text-[38px] xl:text-[40px] 2xl:text-[42px]
      font-normal sm:font-light md:font-normal"
            variants={textVariant}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.02,
              color: "rgba(0,0,0,0.9)",
              transition: { type: "spring", stiffness: 150 },
            }}
          >
            Türk'ün Kanadı ile geleceğe umutla bak!
            <span className="block mt-2 sm:mt-3 text-black/50">
              Birlik ve dayanışma gücümüz.
            </span>
          </motion.h1>

          <motion.p
            className="flex-1 text-neutral-500 leading-relaxed cursor-default
      text-sm sm:text-base md:text-lg lg:text-base xl:text-lg
      mt-4 lg:mt-0"
            variants={textVariant}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{
              scale: 1.01,
              color: "rgba(64,64,64,0.8)",
              transition: { type: "spring", stiffness: 120 },
            }}
          >
            Türkiye Cumhuriyeti'ni daha gelişmiş, huzur dolu ve güçlü bir ülke
            haline getirmek için çalışan bir topluluğuz. Tüm dünyadaki Türklerin
            birlik ve dayanışma içinde olması için çabalıyor, Gazi Mustafa Kemal
            Atatürk'ün izinde durmadan ilerliyoruz.
          </motion.p>
        </div>
        <WhatWeDo />
        <AboutUs />
        <OurWorks />
        <Announcements />
        <ContactUs />
        <div className="w-full h-[100px]"></div>
        <Footer />
      </div>
    </main>
  );
}
