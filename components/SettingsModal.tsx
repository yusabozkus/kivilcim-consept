"use client";
import { auth } from "@/lib/auth";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UpdateProfile from "./UpdateProfile";
import General from "./General";
import { useSettingsModal } from "@/hooks/use-settings-modal";
import { useMediaQuery } from "@/hooks/use-media-query";

type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
};

type TabType = "general" | "profile";

const tabs: TabType[] = ["general", "profile"];

export default function SettingsModal({ session }: Props) {
  const { isOpen, close, activeTab, setActiveTab } = useSettingsModal();
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (session == null) return null;

  const handleTabChange = (newTab: TabType) => {
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(newTab);
    setDirection(newIndex > currentIndex ? -1 : 1);
    setActiveTab(newTab);
  };

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  const SidebarContent = () => (
    <div className="w-full md:w-[220px] bg-white/50 backdrop-blur-sm md:border-r border-white/20 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-black">Settings</h2>
        <button
          onClick={close}
          className="p-1.5 rounded-lg hover:bg-white/80 transition-all duration-200"
        >
          <X size={18} className="text-black" />
        </button>
      </div>
      <nav className="flex flex-row md:flex-col gap-1">
        <button
          onClick={() => handleTabChange("profile")}
          className={`flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 md:flex-none ${
            activeTab === "profile"
              ? `bg-white/70 text-black shadow-sm ${
                  !isDesktop && "border border-primary"
                }`
              : "text-neutral-500 hover:bg-white/50"
          }`}
        >
          <User
            className={`${
              !isDesktop && activeTab === "profile" && "text-primary"
            }`}
            size={18}
          />
          <span className="hidden md:inline">Profile</span>
        </button>
        <button
          onClick={() => handleTabChange("general")}
          className={`flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex-1 md:flex-none ${
            activeTab === "general"
              ? `bg-white/70 text-black shadow-sm ${
                  !isDesktop && "border border-primary"
                }`
              : "text-neutral-500 hover:bg-white/50"
          }`}
        >
          <Settings
            className={`${
              !isDesktop && activeTab === "general" && "text-primary"
            }`}
            size={18}
          />
          <span className="hidden md:inline">General</span>
        </button>
      </nav>
    </div>
  );

  const ContentArea = () => (
    <div className="flex-1 bg-white/70 backdrop-blur-sm overflow-y-auto relative min-h-0">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={activeTab}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="w-full h-full"
        >
          {activeTab === "profile" && <UpdateProfile session={session} />}
          {activeTab === "general" && <General session={session} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
        <DialogContent
          showCloseButton={false}
          className="!max-w-[800px] !w-full !border-none !outline-none !p-0 !m-0 !gap-0 bg-transparent rounded-2xl overflow-hidden !h-[600px] flex flex-row shadow-2xl"
        >
          <DialogHeader className="!p-0">
            <VisuallyHidden>
              <DialogTitle>Settings</DialogTitle>
            </VisuallyHidden>
          </DialogHeader>
          <SidebarContent />
          <ContentArea />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && close()}>
      <DrawerContent className="border-none h-[85vh] flex flex-col">
        <DrawerHeader className="!p-0 sr-only">
          <VisuallyHidden>
            <DrawerTitle>Settings</DrawerTitle>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="flex flex-col flex-1 bg-white/70 backdrop-blur-md rounded-t-2xl overflow-hidden">
          <SidebarContent />
          <ContentArea />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
