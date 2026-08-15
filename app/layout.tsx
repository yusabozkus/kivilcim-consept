import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const deploymentUrl = process.env.NEXT_DEPLOY_URL?.trim();
const siteUrl = deploymentUrl
  ? deploymentUrl.startsWith("http")
    ? deploymentUrl
    : `https://${deploymentUrl}`
  : "http://localhost:3000";

export const site_config = {
  title: "Kıvılcım Creative Collective",
  caption: "Build what matters, together.",
  description:
    "An independent creative technology collective turning public-interest questions into useful, testable products.",
  banner: "/opengraph-image",
  url: siteUrl,
};

const roboto = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site_config.url),
  title: `${site_config.title} - ${site_config.caption}`,
  description: site_config.description,
  openGraph: {
    siteName: `${site_config.title} - ${site_config.caption}`,
    url: site_config.url,
    title: `${site_config.title} - ${site_config.caption}`,
    description: site_config.description,
    images: [
      {
        url: site_config.banner,
        width: 1200,
        height: 630,
        alt: `${site_config.title} - ${site_config.caption}`,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site_config.title} - ${site_config.caption}`,
    description: site_config.description,
    images: [site_config.banner],
  },
};

export const viewport: Viewport = {
  themeColor: "#090d18",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={`${roboto.className} min-h-screen bg-body antialiased`}>
        {children}
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
