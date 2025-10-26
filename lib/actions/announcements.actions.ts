"use server";

import { Prisma, PrismaClient } from "@/lib/generated/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export type Announcement = Prisma.AnnouncementGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
  };
}>;

export interface AnnouncementsResponse {
  announcements: Announcement[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getAnnouncements(
  page: number = 1,
  limit: number = 10
): Promise<AnnouncementsResponse> {
  try {
    const skip = (page - 1) * limit;

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.announcement.count(),
    ]);

    return {
      announcements,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Duyurular alınırken hata:", error);
    throw new Error("Duyurular alınamadı");
  }
}

export async function getAnnouncement(
  id: string
): Promise<Announcement | null> {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return announcement;
  } catch (error) {
    console.error("Duyuru getirme hatası:", error);
    throw new Error("Duyuru bulunamadı");
  }
}

export async function createAnnouncement(data: {
  title: string;
  coverImage: string;
  content: any;
}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Oturum açmanız gerekiyor");
    }

    if (session.user.role !== "admin") {
      throw new Error("Bu işlem için yetkiniz yok");
    }

    if (!data.title || !data.title.trim()) {
      throw new Error("Başlık gereklidir");
    }

    if (!data.content || data.content.length === 0) {
      throw new Error("İçerik gereklidir");
    }

    const announcement = await prisma.announcement.create({
      data: {
        title: data.title.trim(),
        coverImage: data.coverImage,
        content: data.content,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    revalidatePath("/announcements");
    return { success: true, announcement };
  } catch (error: any) {
    console.error("Duyuru oluşturma hatası:", error);
    throw new Error(error.message || "Duyuru oluşturulamadı");
  }
}

export async function updateAnnouncement(
  id: string,
  data: {
    title: string;
    coverImage: string;
    content: any;
  }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("Bu işlem için yetkiniz yok");
    }

    if (!data.title || !data.title.trim()) {
      throw new Error("Başlık gereklidir");
    }

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title: data.title.trim(),
        coverImage: data.coverImage,
        content: data.content,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    revalidatePath("/announcements");
    revalidatePath(`/announcements/${id}`);
    return { success: true, announcement };
  } catch (error: any) {
    console.error("Duyuru güncelleme hatası:", error);
    throw new Error(error.message || "Duyuru güncellenemedi");
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("Bu işlem için yetkiniz yok");
    }

    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/announcements");
    return { success: true, message: "Duyuru silindi" };
  } catch (error: any) {
    console.error("Duyuru silme hatası:", error);
    throw new Error(error.message || "Duyuru silinemedi");
  }
}
