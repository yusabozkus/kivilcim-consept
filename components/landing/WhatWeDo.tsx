"use client";
import { what_we_do } from "@/constants";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // kartların sırayla gelmesini sağlar
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const WhatWeDo = (props: Props) => {
  return (
    <section
      className="w-full lg:h-full flex flex-row items-center justify-center bg-[#F2F4F3] mt-10 px-4 lg:px-0 py-10"
      id="home"
    >
      <div className="max-w-default w-full m-auto flex flex-col gap-16 ">
        {/* Başlık */}
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="text-3xl leading-[50px] lg:text-4xl text-center font-semibold"
        >
          Türk Gençliğiyle Geleceğe <br className="hidden lg:block" />
          Umut ve <span className="text-[#797e80]">Güçle Kanat Açıyoruz</span>
        </motion.h1>

        {/* Kartlar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border"
        >
          {what_we_do.map((item, index) => {
            const Icon = item.icon;

            const borderClasses =
              index === 0
                ? "border-r border-b"
                : index === 1
                ? "border-b border-r"
                : index === 2
                ? "border-b"
                : index === 3
                ? "border-r"
                : index === 4
                ? "border-r"
                : "";

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`flex flex-col gap-6 lg:gap-10 bg-white p-6 lg:p-10 ${borderClasses}`}
              >
                <div className="p-3 lg:p-4 rounded-lg bg-white w-max shadow">
                  <div className="p-2 rounded-full bg-primary">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl lg:text-2xl font-normal">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base text-[#797e80]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDo;
