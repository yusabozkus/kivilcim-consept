"use client";

import { create } from "zustand";

type TabType = "general" | "profile";

interface SettingsModalStore {
  isOpen: boolean;
  activeTab: TabType;
  open: (tab?: TabType) => void;
  close: () => void;
  toggle: () => void;
  setActiveTab: (tab: TabType) => void;
}

export const useSettingsModal = create<SettingsModalStore>((set) => ({
  isOpen: false,
  activeTab: "profile",
  open: (tab) =>
    set((state) => ({
      isOpen: true,
      activeTab: tab ?? state.activeTab,
    })),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveTab: (tab) => set({ activeTab: tab }),
}));