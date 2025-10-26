"use client";
import { socialAccounts } from "@/constants";
import { Mail, Phone } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

type Props = {};

const headingVariants = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const ContactUs = (props: Props) => {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-24 "
      id="contact"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-12 lg:gap-16">
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.h1
            variants={headingVariants}
            className="text-2xl sm:text-3xl lg:text-4xl text-center leading-tight font-bold"
          >
            Bizimle İletişime Geç
          </motion.h1>
          <motion.h1
            variants={headingVariants}
            className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed font-medium text-center max-w-3xl mx-auto"
          >
            Fikirlerin ve katkıların bizim için çok değerli. <br className="hidden sm:block" /> Türk'ün
            Kanadı ailesine sesini duyur, birlikte daha güçlü olalım.
          </motion.h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          <motion.div
            className="w-full lg:flex-1 bg-[#F2F4F3] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={leftVariants}
          >
            <div className="space-y-4">
              <h1 className="text-black font-bold text-xl sm:text-2xl">
                İletişim Bilgileri
              </h1>
              <p className="text-zinc-500 font-medium text-sm sm:text-base">
                Her türlü soru ve öneriniz için bize ulaşabilirsiniz.
              </p>
            </div>
            <ul className="space-y-6 lg:space-y-7">
              <li>
                <a href="" className="flex flex-row items-center gap-4 sm:gap-6">
                  <Mail className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
                  <p className="text-base sm:text-lg font-medium">example@mail.com</p>
                </a>
              </li>
            </ul>
            <ul className="flex flex-row items-center gap-3">
              {socialAccounts.map((item) => (
                <motion.li
                  key={item.platform}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={item.link}
                    target="_blank"
                    className="rounded-lg bg-black p-2 sm:p-2.5 flex hover:bg-primary transition-all ease-linear"
                  >
                    <img
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      src={`/images/${item.icon}`}
                      alt=""
                    />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="w-full lg:flex-[1.5] flex flex-col gap-4 sm:gap-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={rightVariants}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {[
                { id: "first_name", label: "Ad", placeholder: "Adınız" },
                { id: "last_name", label: "Soyad", placeholder: "Soyadınız" },
              ].map((field, i) => (
                <motion.div
                  key={field.id}
                  custom={i}
                  variants={fieldVariants}
                  className="grid w-full items-center gap-2 sm:gap-3"
                >
                  <Label htmlFor={field.id} className="text-sm sm:text-base font-bold">
                    {field.label}
                  </Label>
                  <Input
                    className="h-12 sm:h-[50px] text-sm sm:text-base font-semibold placeholder:font-medium"
                    type="text"
                    id={field.id}
                    placeholder={field.placeholder}
                  />
                </motion.div>
              ))}
            </div>

            {[
              { id: "email", label: "Mail", placeholder: "Mail adresiniz" },
              { id: "subject", label: "Konu", placeholder: "Konu başlığı" },
            ].map((field, i) => (
              <motion.div
                key={field.id}
                custom={i + 2}
                variants={fieldVariants}
                className="grid w-full items-center gap-2 sm:gap-3"
              >
                <Label htmlFor={field.id} className="text-sm sm:text-base font-bold">
                  {field.label}
                </Label>
                <Input
                  className="h-12 sm:h-[50px] text-sm sm:text-base font-semibold placeholder:font-medium"
                  type="text"
                  id={field.id}
                  placeholder={field.placeholder}
                />
              </motion.div>
            ))}

            <motion.div
              custom={4}
              variants={fieldVariants}
              className="grid w-full items-center gap-2 sm:gap-3"
            >
              <Label htmlFor="message" className="text-sm sm:text-base font-bold">
                Mesaj
              </Label>
              <Textarea
                className="h-32 sm:h-[140px] text-sm font-semibold placeholder:font-medium resize-none"
                id="message"
                rows={6}
                placeholder="Mesajınız"
              />
            </motion.div>

            <motion.div
              custom={5}
              variants={fieldVariants}
              className="flex flex-row justify-center sm:justify-end pt-2"
            >
              <Button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-6 text-sm sm:text-base">
                Gönder
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;