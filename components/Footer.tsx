"use client";

import { navItems, socialAccounts } from "@/constants";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const Footer = (props: Props) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-default w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between"
        >
          <div className="flex-1 space-y-6 lg:space-y-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-tight">
              Türk'ün Kanadıyla vatanı yücelt, <br className="hidden sm:block" /> umudu çoğalt!
            </h1>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 lg:gap-10">
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <img src="/images/tr-flag.png" className="w-5 h-5 sm:w-6 sm:h-6" alt="" />
                <p className="text-white/80 text-sm sm:text-base">
                  Birlik içinde Türkiye için çalışıyoruz.
                </p>
              </div>
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <img src="/images/tr-flag.png" className="w-5 h-5 sm:w-6 sm:h-6" alt="" />
                <p className="text-white/80 text-sm sm:text-base">
                  Atatürk izinde umut yaratıyoruz.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row items-start gap-6 sm:gap-5">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideLeft}
              className="w-full sm:flex-1 space-y-3 sm:space-y-4"
            >
              <h1 className="text-white text-lg sm:text-xl font-medium">Misyonumuz</h1>
              <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
                Türkiye Cumhuriyeti'ni ve dünyadaki Türk bilincini geliştirmek
                ve yükseltmek uğruna durmadan çalışmak ve bu yolda Gazi Mustafa
                Kemal Atatürk'ün yolundan ayrılmamaktır.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={slideRight}
              className="w-full sm:flex-1 space-y-3 sm:space-y-4"
            >
              <h1 className="text-white text-lg sm:text-xl font-medium">Vizyonumuz</h1>
              <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
                Türkiye Cumhuriyeti'ni daha gelişmiş, yaşanabilir, huzur dolu ve
                güçlü bir hâle getirmektir. Bununla birlikte, tüm dünyadaki
                Türklerin birlik ve dayanışma içerisinde olması ve Atatürkçülüğü
                yaymaktır.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0 pt-12 sm:pt-16 lg:pt-20 pb-6 lg:pb-10 border-b border-neutral-700"
        >
          <div className="flex flex-row items-center gap-3 sm:gap-4">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 28V12C30 10.8954 29.1046 10 28 10H27.8994C27.369 10 26.8604 10.2109 26.4854 10.5859L10.5859 26.4854C10.2109 26.8604 10 27.369 10 27.8994V40H0V27.8994C2.15312e-05 24.7168 1.26423 21.6645 3.51465 19.4141L19.4141 3.51465C21.6645 1.26423 24.7168 2.1373e-05 27.8994 0H28C34.6274 0 40 5.37258 40 12V28C40 34.6274 34.6274 40 28 40H14V30H28C29.1046 30 30 29.1046 30 28Z M0 0H17L7 10H0V0Z"
                className="fill-primary"
              />
            </svg>
            <h1 className="text-base sm:text-lg font-semibold text-white">Türk'ün Kanadı</h1>
          </div>

          <ul className="hidden md:flex flex-row items-center gap-6 lg:gap-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  className="text-white text-sm hover:text-primary transition-all ease-linear"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <ul className="md:hidden grid grid-cols-2 gap-4 w-full mt-4">
            {navItems.map((item, index) => (
              <li key={index} className="text-center">
                <button
                  className="text-white text-sm hover:text-primary transition-all ease-linear"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <ul className="flex flex-row items-center gap-2 sm:gap-3">
            {socialAccounts.map((item) => (
              <motion.li
                key={item.platform}
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  className="rounded-lg bg-neutral-800 p-2 flex hover:bg-primary transition-all ease-linear"
                >
                  <img
                    className="w-4 h-4"
                    src={`/images/${item.icon}`}
                    alt={item.platform}
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0"
        >
          <p className="text-white text-xs sm:text-sm order-2 sm:order-1">
            © Tüm hakları saklıdır.
          </p>
          <p className="text-white text-xs sm:text-sm text-center order-1 sm:order-2">
            Yazılım ve Tasarım:{" "}
            <a
              href="https://www.instagram.com/yusabozkus/"
              className="hover:text-primary transition-all ease-linear"
              target="_blank"
            >
              <strong>Yuşa Bozkuş</strong>
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;