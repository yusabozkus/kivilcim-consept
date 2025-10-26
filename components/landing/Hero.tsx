'use client'

import Image from "next/image";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { socialAccounts } from "@/constants";
import { motion, easeOut } from "framer-motion"; 

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut }, 
  },
};

const Hero = () => {
  return (
    <section
      className="w-full min-h-screen flex flex-col pt-12 sm:pt-16 md:pt-20 items-center justify-center px-4 lg:px-0"
      id="home"
    >
      <div className="w-full max-w-default flex items-center justify-center h-[85vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] relative overflow-hidden rounded-xl sm:rounded-2xl">
        <motion.img
          src="https://isteataturk.com/gorseller/1570557176_ataturk.jpg"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: easeOut }} 
          className="w-full h-full object-cover rounded-xl sm:rounded-2xl brightness-50"
        />

        <motion.div
          className="absolute inset-4 sm:inset-6 md:inset-8 lg:inset-12 flex flex-col justify-center"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.span
            variants={item}
            className="text-white/60 text-sm sm:text-base md:text-lg font-light bg-white/20 backdrop-blur-sm border border-white/20 px-4 py-2 sm:px-6 sm:py-3 rounded-lg w-fit"
          >
            Türk'ün Kanadı
          </motion.span>

          <motion.h1
            variants={item}
            className="font-semibold text-white leading-tight mt-6 sm:mt-8 md:mt-10
              text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
              sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight 2xl:leading-[105px]"
          >
            <span className="block">Türk'ün Kanadıyla</span>
            <span className="block">vatanı yücelt,</span>
            <span className="block">umudu çoğalt!</span>
          </motion.h1>

          <motion.div variants={item} className="mt-6 sm:mt-8 md:mt-10">
            <motion.a
              href="/auth/login"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 20px rgba(255,255,255,0.3)" 
              }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-white/20 transition-all duration-300"
            >
              <p className="font-light text-white/90">Aramıza Katıl</p>
              <ArrowUpRight className="stroke-white/90 size-4 sm:size-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Desktop Social Stats */}

      </div>
    </section>
  );
};

export default Hero;