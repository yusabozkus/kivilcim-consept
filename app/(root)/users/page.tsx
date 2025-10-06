import UsersClient from "./users-client";
import { cookies } from "next/headers"; 

async function getData() {
  const cookieHeader = cookies().toString(); 
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
    headers: {
      Cookie: cookieHeader, 
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default async function UsersPage() {
  const data = await getData();
  return <UsersClient data={data} />;
}
