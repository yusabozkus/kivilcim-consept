"use client";

import { Announcement } from "@/lib/actions/announcements.actions";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Share2,
  Check,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
  Share,
} from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";

type Props = {
  announcement: Announcement;
};

export default function ShareAnnouncement({ announcement }: Props) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success("Panoya Kopyalandı!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error: any) {
      toast.error("Copy failed", {
        description: error,
      });
    }
  };

  const getTextPreview = (content: any) => {
    if (!content || !Array.isArray(content)) return "";
    const firstTextBlock = content.find((b: any) => b.type === "paragraph");
    if (!firstTextBlock || !firstTextBlock.content) return "";
    const text = firstTextBlock.content
      .map((c: any) => (c.text ? c.text : ""))
      .join(" ");
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: announcement.title,
          text: getTextPreview(announcement.content),
          url: currentUrl,
        });
      } catch (error) {
        console.error("Share failed", error);
      }
    }
  };

  const shareButtons = [
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(announcement.title)}`,
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
    },
    {
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodeURIComponent(
        `${announcement.title} - ${currentUrl}`
      )}`,
    },
    {
      name: "E-posta",
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(
        announcement.title
      )}&body=${encodeURIComponent(currentUrl)}`,
    },
  ];

  // ---------------------------
  // DESKTOP (Dialog)
  // ---------------------------
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <motion.div
            className="
              fixed bottom-8 lg:bottom-24
              left-8 lg:left-auto lg:right-8
              bg-white text-primary p-4 rounded-full shadow-lg hover:shadow-xl
              transition-shadow border border-primary
            "
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-6 h-6" />
          </motion.div>
        </DialogTrigger>

        <DialogContent className="rounded-2xl shadow-xl bg-[#ffffffd6] backdrop-blur-lg !border-none max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Duyuruyu paylaş
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Bu bağlantıyı kopyalayabilir veya doğrudan sosyal medya üzerinden
              paylaşabilirsin.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-2">
            <span className="text-gray-700 text-sm truncate flex-1 px-2">
              {currentUrl}
            </span>
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          <div className="mt-6 flex justify-between gap-3">
            {shareButtons.map((btn) => (
              <motion.a
                key={btn.name}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center flex-1 bg-gray-50 hover:bg-gray-100 rounded-xl py-3 transition"
              >
                {btn.icon}
                <span className="text-xs mt-1">{btn.name}</span>
              </motion.a>
            ))}
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center flex-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl py-3 transition"
            >
              <Share className="w-5 h-5" />
              <span className="text-xs mt-1">Diğer</span>
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // ---------------------------
  // MOBILE (Drawer)
  // ---------------------------
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <motion.div
          className="
            fixed bottom-8 left-8
            bg-white text-primary p-4 rounded-full shadow-lg hover:shadow-xl
            transition-shadow border border-primary
          "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-6 h-6" />
        </motion.div>
      </DrawerTrigger>

      <DrawerContent className="bg-[#ffffffd6] backdrop-blur-md border-t border-gray-200">
        <DrawerHeader className="text-left">
          <DrawerTitle>Duyuruyu paylaş</DrawerTitle>
          <DrawerDescription>
            Bu bağlantıyı kopyalayabilir veya doğrudan sosyal medya üzerinden
            paylaşabilirsin.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4">
          <div className="mt-2 flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-2">
            <span className="text-gray-700 text-sm truncate flex-1 px-2">
              {currentUrl}
            </span>
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {shareButtons.map((btn) => (
              <motion.a
                key={btn.name}
                href={btn.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-xl py-3 transition"
              >
                {btn.icon}
                <span className="text-xs mt-1">{btn.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <DrawerFooter className="flex flex-row w-full gap-2">
          <DrawerClose className="flex-1" asChild>
            <Button variant="outline">Kapat</Button>
          </DrawerClose>
          <Button onClick={handleShare} className="flex-1 gap-2">
            <Share className="w-4 h-4" />
            Paylaş
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
