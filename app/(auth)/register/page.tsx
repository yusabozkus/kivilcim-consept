import React from "react";
import RegisterClient from "./register-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { site_config } from "@/app/layout";

export const metadata: Metadata = {
  title: `Kayıt Ol - ${site_config.title}`,
  description: `${site_config.title} topluluğuna katılın ve Türkiye'nin geleceği için bizimle birlikte çalışın. Atatürk'ün idealleri doğrultusunda hareket eden topluluğumuzun bir parçası olun.`,
  openGraph: {
    title: `Kayıt Ol - ${site_config.title}`,
    description: `Topluluğumuza üye olun ve projelerimizde aktif rol alın. ${site_config.caption}`,
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
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Kayıt Ol - ${site_config.title}`,
    description: `Topluluğumuza katılın ve fark yaratın. ${site_config.caption}`,
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