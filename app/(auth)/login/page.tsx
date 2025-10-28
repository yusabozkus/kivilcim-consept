import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import React from "react";
import LoginClient from "./login-client";
import { site_config } from "@/app/layout";

export const metadata: Metadata = {
  title: `Giriş Yap - ${site_config.title}`,
  description: `Topluluğumuza katılmak ve projelerimizde yer almak için giriş yapın. Atatürk'ün izinde, Türkiye'nin geleceği için birlikte çalışalım.`,
  openGraph: {
    title: `Giriş Yap - ${site_config.title}`,
    description: `Topluluğumuza katılmak ve projelerimizde yer almak için giriş yapın. ${site_config.caption}`,
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
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Giriş Yap - ${site_config.title}`,
    description: `Topluluğumuza katılın. ${site_config.caption}`,
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
