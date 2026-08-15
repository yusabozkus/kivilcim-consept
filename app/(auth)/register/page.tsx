import React from "react";
import RegisterClient from "./register-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { site_config } from "@/app/layout";

export const metadata: Metadata = {
  title: `Join the Collective - ${site_config.title}`,
  description: `Share your skills, curiosity, and the kind of work you want to build with ${site_config.title}.`,
  openGraph: {
    title: `Join the Collective - ${site_config.title}`,
    description: `Build creative technology and social-impact projects together. ${site_config.caption}`,
    url: `${site_config.url}/register`,
    siteName: site_config.title,
    images: [
      {
        url: site_config.banner,
        width: 1200,
        height: 630,
        alt: site_config.title,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Join the Collective - ${site_config.title}`,
    description: `Join a Kıvılcım project team. ${site_config.caption}`,
    images: [site_config.banner],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function RegisterPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/");
  }
  return <RegisterClient />;
}
