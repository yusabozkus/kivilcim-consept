import UsersClient from "./users-client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      phoneNumber: true,
      profession: true,
      department: true,
      skills: true,
      reason: true,
      role: true,
      city: true,
      createdAt: true,
      updatedAt: true,
      image: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return users.map((user) => ({
    ...user,
    image: user.image ?? "",
    birthDate: user.birthDate ?? "",
    phoneNumber: user.phoneNumber ?? "",
    profession: user.profession ?? "",
    department: user.department ?? "",
    skills: user.skills ?? "",
    reason: user.reason ?? "",
    role: user.role ?? "user",
    city: user.city ?? "",
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  }));
}

export default async function UsersPage() {
  const data = await getData();
  return <UsersClient data={data} />;
}
