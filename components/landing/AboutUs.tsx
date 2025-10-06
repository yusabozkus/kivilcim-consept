"use client";
import { socialAccounts } from "@/constants";
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

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const AboutUs = (props: Props) => {
  return (
    <section
      className="w-full min-h-screen flex flex-row items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 lg:px-0"
      id="about-us"
    >
      <div className="max-w-default w-full mx-auto flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        <motion.div
          className="flex-1 order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h1
            variants={textVariants}
            className="font-bold leading-tight
              text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl"
          >
            Biz Kimiz?
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="leading-relaxed font-light text-neutral-600
              text-sm sm:text-base md:text-lg lg:text-base xl:text-lg
              mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14"
          >
            <span className="font-medium text-primary">Türk'ün Kanadı</span>,
            ülkesine bağlı, üretken ve dayanışmacı gençleri bir araya getiren
            bir topluluktur. Vatan sevgisini sadece bir duygu değil, somut bir
            eylem olarak gören bizler; bilimin, teknolojinin ve kültürün
            ışığında ülkemizin geleceğine katkı sunmayı amaçlıyoruz.
            <span className="block mt-4 sm:mt-5">
              Her adımımızda birlik, her projemizde umut, her başarıda ise
              ülkemizin yarınlarına olan inancımız var.
            </span>
            <span className="block mt-4 sm:mt-5 font-normal">
              Biz, gitmek yerine kalmayı; seyretmek yerine değiştirmeyi
              seçiyoruz.
            </span>
          </motion.p>

          <motion.div
            className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10
              mt-8 sm:mt-10 md:mt-12 lg:mt-14"
            variants={containerVariants}
          >
            {socialAccounts.map((item, index) => (
              <motion.div
                variants={statVariants}
                className="flex flex-row gap-4 sm:gap-5"
                key={index}
              >
                <div className="bg-primary w-1.5 h-full min-h-[60px] rounded-full"></div>
                <div className="space-y-2 sm:space-y-3 py-2">
                  <h1
                    className="font-normal
                    text-2xl sm:text-3xl md:text-3xl lg:text-2xl xl:text-3xl"
                  >
                    {item.count}
                  </h1>
                  <p
                    className="font-light text-neutral-600
                    text-xs sm:text-sm md:text-base lg:text-sm"
                  >
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end"
          variants={imageVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] h-64 sm:h-80 md:h-96 lg:h-full min-h-[300px] lg:min-h-[500px]">
            <img
              src="https://1.bp.blogspot.com/-DbBKHUSBX8Q/V4js7KRzqVI/AAAAAAAAl_4/mnaR-EXLOFc0D0E4Rhb2-3noXTWq7MvhQCLcB/s0/4k-ultrahd-turk-bayraklari-resimleri-18.jpg"
              className="w-full h-full rounded-xl sm:rounded-2xl object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
              alt="Türk Bayrağı"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
