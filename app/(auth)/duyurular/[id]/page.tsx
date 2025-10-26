import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageClient from "./page-client";
import { getAnnouncement } from "@/lib/actions/announcements.actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const announcement = await getAnnouncement(id);

  if (!announcement) {
    return {
      title: "Duyuru Bulunamadı",
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

  const defaultImage = "https://1.bp.blogspot.com/-DbBKHUSBX8Q/V4js7KRzqVI/AAAAAAAAl_4/mnaR-EXLOFc0D0E4Rhb2-3noXTWq7MvhQCLcB/s0/4k-ultrahd-turk-bayraklari-resimleri-18.jpg";
  
  let imageUrl = defaultImage;
  if (announcement.coverImage) {
    if (announcement.coverImage.startsWith('data:image')) {
      imageUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/announcement-image/${id}`;
    } else {
      imageUrl = announcement.coverImage;
    }
  }

  return {
    title: announcement.title,
    description: getTextPreview(announcement.content),
    openGraph: {
      siteName: "Türk'ün Kanadı",
      title: announcement.title,
      description: getTextPreview(announcement.content),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: announcement.title,
        },
      ],
      type: "article",
      publishedTime: announcement.createdAt.toISOString(),
      modifiedTime: announcement.updatedAt.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: announcement.title,
      description: getTextPreview(announcement.content),
      images: [imageUrl],
    },
  };
}

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const announcement = await getAnnouncement(id);
  if (!announcement) {
    notFound();
  }
  return <PageClient announcement={announcement} />;
}