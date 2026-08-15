"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { Prisma } from "../generated/prisma";

export type Work = Prisma.WorkGetPayload<{
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

export interface WorksResponse {
  data: Work[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getWorks(
  page: number = 1,
  limit: number = 10
): Promise<WorksResponse> {
  try {
    const skip = (page - 1) * limit;

    const [works, total] = await Promise.all([
      prisma.work.findMany({
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.work.count(),
    ]);

    return {
      data: works,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Unable to fetch projects:", error);
    throw new Error("Unable to fetch projects");
  }
}

// 🔹 Tek bir proje getir
export async function getWork(id: string): Promise<Work | null> {
  try {
    const work = await prisma.work.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    return work;
  } catch (error) {
    console.error("Unable to fetch project:", error);
    throw new Error("Project not found");
  }
}

// 🔹 Yeni proje oluştur
export async function createWork(data: {
  title: string;
  coverImage: string;
  content: string;
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

    const work = await prisma.work.create({
      data: {
        title: data.title.trim(),
        coverImage: data.coverImage,
        content: data.content.trim(),
        userId: session.user.id,
      },
      include: {
        user: {
          select: { id: true, name: true, email: true, image: true },
        },
      },
    });

    revalidatePath("/works");
    return { success: true, work };
  } catch (error: any) {
    console.error("Unable to create project:", error);
    throw new Error(error.message || "Unable to create project");
  }
}

// 🔹 Proje güncelle
export async function updateWork(
  id: string,
  data: {
    title: string;
    coverImage: string;
    content: string;
  }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("You do not have permission for this action");
    }

    const work = await prisma.work.update({
      where: { id },
      data: {
        title: data.title.trim(),
        coverImage: data.coverImage,
        content: data.content.trim(),
      },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    revalidatePath("/works");
    revalidatePath(`/works/${id}`);
    return { success: true, work };
  } catch (error: any) {
    console.error("Unable to update project:", error);
    throw new Error(error.message || "Unable to update project");
  }
}

// 🔹 Proje sil
export async function deleteWork(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
      throw new Error("You do not have permission for this action");
    }

    await prisma.work.delete({
      where: { id },
    });

    revalidatePath("/works");
    return { success: true, message: "Project deleted" };
  } catch (error: any) {
    console.error("Unable to delete project:", error);
    throw new Error(error.message || "Unable to delete project");
  }
}
