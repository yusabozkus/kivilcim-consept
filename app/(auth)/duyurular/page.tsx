import React from "react";
import AnnouncementsClient from "./page-client";
import { getAnnouncements } from "@/lib/actions/announcements.actions";
import { Metadata } from "next";
import { site_config } from "@/app/layout";

export const metadata: Metadata = {
  title: `Duyurular - ${site_config.title}`,
  description: `${site_config.title} topluluğunun güncel duyurularını, etkinliklerini ve haberlerini takip edin. Projelerimiz ve faaliyetlerimiz hakkında en son gelişmelerden haberdar olun.`,
  openGraph: {
    title: `Duyurular - ${site_config.title}`,
    description: `Topluluğumuzun güncel duyuruları, etkinlikleri ve haberlerini keşfedin. ${site_config.caption}`,
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
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Duyurular - ${site_config.title}`,
    description: `Topluluğumuzun güncel duyurularını takip edin. ${site_config.caption}`,
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
