import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

export const site_config = {
  title: "Türk'ün Kanadı",
  caption: "Uçmaya kanadımız yoksa kendimiz kanat oluruz!",
  description:
    "Türkiye Cumhuriyeti'ni daha gelişmiş, huzur dolu ve güçlü bir ülke haline getirmek için çalışan bir topluluğuz. Tüm dünyadaki Türklerin birlik ve dayanışma içinde olması için çabalıyor, Gazi Mustafa Kemal Atatürk'ün izinde durmadan ilerliyoruz.",
  banner:
    "https://cdn.quicksigorta.com/qblog/content/d7/a8/b0/content-2871-d7a8b092-5fe7-4a0e-8c58-35dbddb2cb31_960x720.jpg",
  url: "",
};

const roboto = Mulish({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
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
  themeColor: "#a2000b",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={roboto.variable}>
      <body className={`${roboto.className} antialiased h-screen bg-body`}>
        {children}
        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
