import React from "react";
import AnnouncementsClient from "./page-client";
import { getAnnouncements } from "@/lib/actions/announcements.actions";
import { Metadata } from "next";
import { site_config } from "@/app/layout";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `Studio Journal - ${site_config.title}`,
  description: `Stories, open calls, events, and notes from the ${site_config.title} studio.`,
  openGraph: {
    title: `Studio Journal - ${site_config.title}`,
    description: `Discover the latest stories, events, and open calls. ${site_config.caption}`,
    url: `${site_config.url}/announcements`,
    siteName: site_config.title,
    images: [
      {
        url: site_config.banner,
        width: 1200,
        height: 630,
        alt: site_config.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Studio Journal - ${site_config.title}`,
    description: `Follow the latest from the studio. ${site_config.caption}`,
    images: [site_config.banner],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function AnnouncementsPage() {
  const data = await getAnnouncements();

  return <AnnouncementsClient announcements={data} />;
}
