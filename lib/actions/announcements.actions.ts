"use server";

import { Prisma } from "@/lib/generated/prisma";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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
  data: Announcement[];
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
      data: announcements,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Unable to fetch stories:", error);
    throw new Error("Unable to fetch stories");
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
    console.error("Unable to fetch story:", error);
    throw new Error("Story not found");
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
      throw new Error("You need to sign in");
    }

    if (session.user.role !== "admin") {
      throw new Error("You do not have permission for this action");
    }

    if (!data.title || !data.title.trim()) {
      throw new Error("Title is required");
    }

    if (!data.content || data.content.length === 0) {
      throw new Error("Content is required");
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
    console.error("Unable to create story:", error);
    throw new Error(error.message || "Unable to create story");
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
      throw new Error("You do not have permission for this action");
    }

    if (!data.title || !data.title.trim()) {
      throw new Error("Title is required");
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
    console.error("Unable to update story:", error);
    throw new Error(error.message || "Unable to update story");
  }
}

export async function deleteAnnouncement(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("You do not have permission for this action");
    }

    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath("/announcements");
    return { success: true, message: "Story deleted" };
  } catch (error: any) {
    console.error("Unable to delete story:", error);
    throw new Error(error.message || "Unable to delete story");
  }
}
