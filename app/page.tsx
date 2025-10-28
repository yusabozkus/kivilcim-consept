"use server";

import { auth } from "@/lib/auth";
import LandingClient from "./landing-client";
import { headers } from "next/headers";
import { getAnnouncements } from "@/lib/actions/announcements.actions";
import LenisProvider from "@/components/LenisProvider";
import { getWorks } from "@/lib/actions/work.actions";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const announcements = await getAnnouncements();
  const works = await getWorks(1, 6);

  return (
    <LenisProvider>
      <LandingClient works={works} announcements={announcements} session={session} />
    </LenisProvider>
  );
}
