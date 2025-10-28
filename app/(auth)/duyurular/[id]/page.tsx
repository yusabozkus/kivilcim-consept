import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageClient from "./page-client";
import { getAnnouncement } from "@/lib/actions/announcements.actions";
import { site_config } from "@/app/layout";

export const dynamic = "force-dynamic";

const baseUrl = "https://turkunkanadi.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const announcement = await getAnnouncement(id);

  if (!announcement) {
    return {
      title: `Duyuru Bulunamadı - ${site_config.title}`,
      description: "Aradığınız duyuru bulunamadı.",
      openGraph: {
        title: `Duyuru Bulunamadı - ${site_config.title}`,
        description: "Aradığınız duyuru bulunamadı.",
        url: `${baseUrl}/duyurular/${id}`,
        siteName: site_config.title,
        images: [
          {
            url: `${baseUrl}/default-og-image.jpg`,
            width: 1200,
            height: 630,
            alt: "Duyuru Bulunamadı",
          },
        ],
        type: "article",
      },
    };
  }

  const getTextPreview = (content: any) => {
    if (!content || !Array.isArray(content)) return "";
    const firstTextBlock = content.find((b: any) => b.type === "paragraph");
    if (!firstTextBlock || !firstTextBlock.content) return "";
    const text = firstTextBlock.content
      .map((c: any) => (c.text ? c.text : ""))
      .join(" ");
    return text.length > 150 ? text.slice(0, 150) + "..." : text;
  };

  let imageUrl = "";

  if (announcement.coverImage) {
    if (announcement.coverImage.startsWith("data:image")) {
      imageUrl = `${baseUrl}/api/announcement-image/${id}`;
    } else if (announcement.coverImage.startsWith("http")) {
      imageUrl = announcement.coverImage;
    } else {
      imageUrl = `${baseUrl}${announcement.coverImage}`;
    }
  }

  const textPreview = getTextPreview(announcement.content);

  const createdAt = new Date(announcement.createdAt).toISOString();
  const updatedAt = new Date(announcement.updatedAt).toISOString();

  return {
    title: `${announcement.title} - ${site_config.title}`,
    description: textPreview,
    openGraph: {
      siteName: site_config.title,
      url: `${baseUrl}/duyurular/${id}`,
      title: `${announcement.title} - ${site_config.title}`,
      description: textPreview,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: announcement.title,
        },
      ],
      type: "article",
      publishedTime: createdAt,
      modifiedTime: updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: `${announcement.title} - ${site_config.title}`,
      description: textPreview,
      images: [imageUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const announcement = await getAnnouncement(id);

  if (!announcement) {
    notFound();
  }

  return <PageClient announcement={announcement} />;
}
