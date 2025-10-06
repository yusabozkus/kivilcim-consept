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
          src="https://2.bp.blogspot.com/-pJGjr2Nl_rg/V4jtDfm-GxI/AAAAAAAAmAE/LlmgAgYg4iwSizqTWIHWFDH0Cf-q1tpfwCLcB/s0/4k-ultrahd-turk-bayraklari-resimleri-4.jpg"
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
        <motion.div
          className="absolute bottom-0 right-0 px-6 py-4 sm:px-8 sm:py-5 md:px-10 md:py-6 bg-white rounded-tl-2xl sm:rounded-tl-3xl md:rounded-tl-4xl 
            hidden sm:flex flex-row items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {socialAccounts.map((itemData, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center gap-1 sm:gap-2"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-gray-800">
                {itemData.count}
              </h1>
              <span className="text-neutral-500 text-xs sm:text-sm md:text-base">
                {itemData.platform}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Social Stats */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 mx-4 mb-4 px-4 py-3 bg-white/90 backdrop-blur-sm rounded-xl 
            flex sm:hidden flex-row items-center justify-around gap-2"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {socialAccounts.map((itemData, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center gap-1"
            >
              <h1 className="text-lg font-semibold text-gray-800">
                {itemData.count}
              </h1>
              <span className="text-neutral-600 text-xs">
                {itemData.platform}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;