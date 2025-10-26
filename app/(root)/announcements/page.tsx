import React from "react";
import AnnouncementsClient from "./announcements-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PrismaClient } from "@/lib/generated/prisma";
import { getAnnouncements } from "@/lib/actions/announcements.actions";

const prisma = new PrismaClient();

export default async function AnnouncementsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const initialData = await getAnnouncements(1, 10);

  return <AnnouncementsClient session={session} data={initialData} />;
}
