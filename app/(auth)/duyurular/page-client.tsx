"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Announcement } from "@/lib/actions/announcements.actions";
import { formatDistanceToNowStrict } from "date-fns";
import { tr } from "date-fns/locale";
import { ArrowRight } from "lucide-react";

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

type ClientProps = {
  data: {
    announcements: Announcement[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export default function PageClient({ data }: ClientProps) {
  const getTextPreview = (content: any) => {
    if (!content || !Array.isArray(content)) return "";
    const firstTextBlock = content.find((b: any) => b.type === "paragraph");
    if (!firstTextBlock || !firstTextBlock.content) return "";
    const text = firstTextBlock.content
      .map((c: any) => (c.text ? c.text : ""))
      .join(" ");
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <motion.header
        className="w-full py-4 sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-neutral-200/50"
        variants={headerVariants}
        initial="hidden"
        animate="show"
      >
        <nav className="m-auto max-w-[1200px] px-6 w-full h-full flex flex-row items-center justify-between">
          <motion.div
            className="flex flex-row items-center gap-3 sm:gap-4"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            <Logo />
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-neutral-900 to-neutral-600 bg-clip-text text-transparent">
              Türk'ün Kanadı
            </h1>
          </motion.div>

          <motion.div
            className="flex flex-row gap-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 py-5 border-2 border-primary hover:bg-primary text-primary hover:text-white transition-all duration-300"
            >
              <Link href="/">Ana Sayfa</Link>
            </Button>
          </motion.div>
        </nav>
      </motion.header>

      <div className="max-w-[1200px] m-auto w-full px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-600 bg-clip-text text-transparent mb-4">
            Güncel Duyurular
          </h1>
          <p className="text-neutral-600 text-lg">
            En son haberler ve güncellemeler
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {data.announcements.map((item) => {
            const previewText = getTextPreview(item.content);

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link href={`/duyurular/${item.id}`}>
                  <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-neutral-200/50 hover:border-neutral-300">
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        className="w-full h-full object-cover"
                        src={item.coverImage}
                        alt={item.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-4 py-2 bg-white/95 backdrop-blur-sm text-neutral-900 rounded-full text-sm font-medium shadow-lg">
                          {formatDistanceToNowStrict(new Date(item.createdAt), {
                            addSuffix: true,
                            locale: tr,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-neutral-700 transition-colors">
                          {item.title}
                        </h2>
                        <p className="text-neutral-600 text-base leading-relaxed line-clamp-3">
                          {previewText}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 object-cover rounded-full ring-2 ring-neutral-100"
                            src={item.user.image || ""}
                            alt={item.user.name}
                          />
                          <div>
                            <p className="text-sm font-semibold text-neutral-900">
                              {item.user.name}
                            </p>
                            <p className="text-xs text-neutral-500">Yazar</p>
                          </div>
                        </div>

                        <motion.div
                          className="flex items-center gap-2 text-neutral-900 font-medium"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="text-sm">Devamı</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {data.announcements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-neutral-500 text-lg">
              Henüz duyuru bulunmamaktadır.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
