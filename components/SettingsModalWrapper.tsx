"use client";

import SettingsModal from "./SettingsModal";
import { auth } from "@/lib/auth";

type Props = {
  session: typeof auth.$Infer.Session | null;
};

export default function SettingsModalWrapper({ session }: Props) {
  return <SettingsModal session={session} />;
}