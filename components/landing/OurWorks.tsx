"use client";
import { ourWorks } from "@/constants";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const OurWorks = (props: Props) => {
  return (
    <section
      className="w-full lg:h-full flex flex-row items-center justify-center px-4 lg:px-0"
      id="our-works"
    >
      <div className="max-w-default w-full m-auto flex flex-col gap-16">
        <motion.h1
          variants={headingVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="text-4xl text-center leading-[50px] font-bold"
        >
          Projeler ve Etkinlikler
        </motion.h1>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {ourWorks.map((item, index) => (
            <motion.div
              key={`our_works_${index}`}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: "easeOut" as const }}
              className="w-full h-[290px] rounded-2xl overflow-hidden relative group shadow"
            >
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <motion.div
                className="absolute bottom-4 left-0 right-0 w-auto bg-[#ffffffcb] backdrop-blur-sm mx-4 rounded-xl p-5 text-center space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" as const }}
              >
                <h1 className="text-black text-lg font-bold">{item.title}</h1>
                <p className="text-sm">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurWorks;
