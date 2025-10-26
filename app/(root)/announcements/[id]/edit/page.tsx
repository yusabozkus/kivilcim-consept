import React from "react";
import EditClient from "./page-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAnnouncement } from "@/lib/actions/announcements.actions";

export default async function Edit({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const { id } = await params;
  const data = await getAnnouncement(id);

  if(!data?.id) return redirect("/announcements")

  return <EditClient data={data} />;
}