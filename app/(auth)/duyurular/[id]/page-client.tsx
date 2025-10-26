"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Announcement } from "@/lib/actions/announcements.actions";
import { formatDistanceToNowStrict } from "date-fns";
import { tr } from "date-fns/locale";
import { ArrowLeft, Calendar, ArrowUp } from "lucide-react";
import { PartialBlock } from "@blocknote/core";
import "@blocknote/shadcn/style.css";
import dynamic from "next/dynamic";

const BlockNoteView = dynamic(
  async () => (await import("@blocknote/shadcn")).BlockNoteView,
  { ssr: false }
);

function useSafeCreateBlockNote(content: PartialBlock[] | undefined) {
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    import("@blocknote/react").then(({ useCreateBlockNote }) => {
      const e = useCreateBlockNote({
        initialContent: content,
      });
      setEditor(e);
    });
  }, [content]);

  return editor;
}

const headerVariants = {
  hidden: { y: -100, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

type PageClientProps = {
  announcement: Announcement;
};

export default function PageClient({ announcement }: PageClientProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const editor = useSafeCreateBlockNote(
    announcement.content
      ? (announcement.content as any as PartialBlock[])
      : undefined
  );

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  if (!editor) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-500">
        Yükleniyor...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100">
      <motion.header
        className="w-full py-4 sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-xl z-50 border-b border-primary/50"
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
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
          >
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 py-5 border-2 border-primary hover:bg-primary text-primary hover:text-white transition-all duration-300"
            >
              <Link href="/duyurular">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Geri Dön
              </Link>
            </Button>
          </motion.div>
        </nav>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-primary origin-left"
          style={{ scaleX }}
        />
      </motion.header>

      <motion.article
        className="max-w-[900px] m-auto px-4 py-10 lg:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="relative max-h-[500px] h-full rounded-3xl overflow-hidden mb-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={announcement.coverImage}
            alt={announcement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-neutral-200">
            <img
              src={announcement.user.image || ""}
              alt={announcement.user.name}
              className="w-10 h-10 rounded-full ring-2 ring-neutral-100"
            />
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                {announcement.user.name}
              </p>
              <p className="text-xs text-neutral-500">Yazar</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-sm border border-neutral-200">
            <Calendar className="w-4 h-4 text-neutral-600" />
            <span className="text-sm text-neutral-700">
              {formatDistanceToNowStrict(new Date(announcement.createdAt), {
                addSuffix: true,
                locale: tr,
              })}
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-neutral-900 mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {announcement.title}
        </motion.h1>

        <motion.div
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <BlockNoteView editor={editor} editable={false} theme="light" />
        </motion.div>
      </motion.article>

      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          aria-label="Yukarı çık"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}
