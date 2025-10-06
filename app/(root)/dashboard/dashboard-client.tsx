'use client'

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth-actions";
import { auth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React from "react";

type Session = typeof auth.$Infer.Session;

export default function DashboardClient({
  session,
}: {
  session: Session | null;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div>
      Welcome, {session?.user.name}
      <br />
      Email, {session?.user.email}
      <br />
      profession, {session?.user?.profession}
      <br />
      <Button onClick={handleSignOut}>Log out</Button>{" "}
    </div>
  );
}
