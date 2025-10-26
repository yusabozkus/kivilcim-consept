"use server";

import { auth } from "@/lib/auth";
import LandingClient from "./landing-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAnnouncements } from "@/lib/actions/announcements.actions";
import LenisProvider from "@/components/LenisProvider";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const announcements = await getAnnouncements();

  return (
    <LenisProvider>
      <LandingClient data={announcements} session={session} />
    </LenisProvider>
  );
}
