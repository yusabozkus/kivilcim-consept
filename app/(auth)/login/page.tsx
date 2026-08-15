import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import React from "react";
import LoginClient from "./login-client";
import { site_config } from "@/app/layout";

export const metadata: Metadata = {
  title: `Studio Login - ${site_config.title}`,
  description: `Sign in to manage Kıvılcım projects, stories, and applications.`,
  openGraph: {
    title: `Studio Login - ${site_config.title}`,
    description: `Kıvılcım management workspace. ${site_config.caption}`,
    url: `${site_config.url}/login`,
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
    title: `Studio Login - ${site_config.title}`,
    description: `Kıvılcım management workspace. ${site_config.caption}`,
    images: [site_config.banner],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <LoginClient />;
}
