"use client";

import { Home, Layers, Megaphone, Users } from "lucide-react";

const cityNames = [
  "ADANA", "ADIYAMAN", "AFYONKARAHİSAR", "AĞRI", "AMASYA", "ANKARA",
  "ANTALYA", "ARTVİN", "AYDIN", "BALIKESİR", "BİLECİK", "BİNGÖL",
  "BİTLİS", "BOLU", "BURDUR", "BURSA", "ÇANAKKALE", "ÇANKIRI",
  "ÇORUM", "DENİZLİ", "DİYARBAKIR", "EDİRNE", "ELAZIĞ", "ERZİNCAN",
  "ERZURUM", "ESKİŞEHİR", "GAZİANTEP", "GİRESUN", "GÜMÜŞHANE", "HAKKARİ",
  "HATAY", "ISPARTA", "MERSİN", "İSTANBUL", "İZMİR", "KARS",
  "KASTAMONU", "KAYSERİ", "KIRKLARELİ", "KIRŞEHİR", "KOCAELİ", "KONYA",
  "KÜTAHYA", "MALATYA", "MANİSA", "KAHRAMANMARAŞ", "MARDİN", "MUĞLA",
  "MUŞ", "NEVŞEHİR", "NİĞDE", "ORDU", "RİZE", "SAKARYA", "SAMSUN",
  "SİİRT", "SİNOP", "SİVAS", "TEKİRDAĞ", "TOKAT", "TRABZON", "TUNCELİ",
  "ŞANLIURFA", "UŞAK", "VAN", "YOZGAT", "ZONGULDAK", "AKSARAY",
  "BAYBURT", "KARAMAN", "KIRIKKALE", "BATMAN", "ŞIRNAK", "BARTIN",
  "ARDAHAN", "IĞDIR", "YALOVA", "KARABÜK", "KİLİS", "OSMANİYE", "DÜZCE",
];

export const provinces = Object.fromEntries(
  cityNames.map((city, index) => [String(index + 1), city])
) as Record<string, string>;

export const sidebarItems = [
  { title: "Overview", url: "/dashboard", icon: Home, isShow: true },
  { title: "Applications", url: "/users", icon: Users, isShow: true },
  { title: "Studio Journal", url: "/announcements", icon: Megaphone, isShow: true },
  { title: "Projects", url: "/works", icon: Layers, isShow: true },
];
