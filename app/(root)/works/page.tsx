import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import PageClient from "./page-client";
import { getWorks } from "@/lib/actions/work.actions";

export default async function WorkPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  const data = await getWorks();

  return <PageClient data={data} session={session} />;
}
