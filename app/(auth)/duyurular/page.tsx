import React from "react";
import AnnouncementsClient from "./page-client";
import { getAnnouncements } from "@/lib/actions/announcements.actions";

export default async function AnnouncementsPage() {
  const data = await getAnnouncements();

  return <AnnouncementsClient data={data} />;
}
