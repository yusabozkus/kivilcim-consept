"use server";

import { auth } from "@/lib/auth";
import LandingClient from "./landing-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <LandingClient session={session} />;
}
