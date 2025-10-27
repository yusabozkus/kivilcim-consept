"use client";

import {
  Flag,
  Handshake,
  Scale,
  Rocket,
  Star,
  Globe2,
  Users,
  Home,
  User,
  Megaphone,
  Layers,
  Plus,
} from "lucide-react";

export const navItems = [
  { id: "#home", label: "Ana Sayfa" },
  { id: "#about-us", label: "Hakkımızda" },
  { id: "#our-works", label: "Çalışmalarımız" },
  { id: "#announcements", label: "Duyurular" },
  { id: "#contact", label: "İletişim" },
];

export const what_we_do = [
  {
    icon: Flag,
    title: "Güçlü Türkiye Geleceği",
    description:
      "Türkiye Cumhuriyeti’ni daha gelişmiş, huzurlu ve refah dolu bir ülke haline getirmek için çalışıyoruz. Bilimden sanata, teknolojiden eğitime kadar her alanda ilerleme hedefliyoruz.",
  },
  {
    icon: Handshake,
    title: "Birlik ve Dayanışma",
    description:
      "Dünyanın dört bir yanında yaşayan Türkleri ortak bir amaç ve değer etrafında birleştiriyoruz. Birlik duygusunu güçlendirerek birbirimize destek oluyoruz.",
  },
  {
    icon: Scale,
    title: "Huzurlu Toplum İnşası",
    description:
      "Toplumda barış, adalet ve karşılıklı saygı kültürünü yaymak için adımlar atıyoruz. İnsanların huzur içinde yaşayabileceği bir gelecek inşa etmeye çalışıyoruz.",
  },
  {
    icon: Rocket,
    title: "Geleceğe Umut",
    description:
      "Gençlerin yeteneklerini ve potansiyellerini ortaya çıkararak onları geleceğe hazırlıyoruz. Eğitim, girişimcilik ve yenilikçilik alanlarında destek sağlıyoruz.",
  },
  {
    icon: Star,
    title: "Atatürk Yolunda",
    description:
      "Gazi Mustafa Kemal Atatürk’ün ilke ve inkılaplarını rehber edinerek hareket ediyoruz. Onun gösterdiği çağdaş uygarlık yolunda durmadan ilerliyoruz.",
  },
  {
    icon: Globe2,
    title: "Türk Dünyası Birliği",
    description:
      "Tüm Türk halklarının kültürel, sosyal ve ekonomik bağlarını güçlendirmeyi amaçlıyoruz. Ortak kimlik bilinciyle sınırları aşan bir dayanışma ağı kuruyoruz.",
  },
];

export const socialAccounts = [
  {
    platform: "Instagram",
    count: "2300+",
    text: "Instagram üzerinden topluluğumuzun enerjisini ve çalışmalarımızı paylaşıyoruz.",
    icon: "instagram.png",
    link: "https://www.instagram.com/turkunkanadi",
  },
  {
    platform: "TikTok",
    count: "1500+",
    text: "TikTok hesabımızda kısa ve ilham verici videolarla gençlere ulaşıyoruz.",
    icon: "tiktok.png",
    link: "https://www.tiktok.com/@turkunkanadi",
  },
  {
    platform: "X",
    count: "1200+",
    text: "X (Twitter) platformunda fikirlerimizi ve güncel gelişmeleri paylaşıyoruz.",
    icon: "x.png",
    link: "https://x.com/turkunkanadii",
  },
  {
    platform: "WhatsApp",
    count: "800+",
    text: "WhatsApp kanalımızda anlık haberleri ve duyuruları üyelerimizle paylaşıyoruz.",
    icon: "whatsapp.png",
    link: "https://www.whatsapp.com/channel/0029VajFxC53GJOzhCfVJ71f",
  },
  {
    platform: "YouTube",
    count: "10+",
    text: "YouTube kanalımızda en yeni videoları, duyuruları ve etkinlikleri sizlerle paylaşıyoruz.",
    icon: "youtube.png",
    link: "https://www.youtube.com/@T%C3%BCrk%C3%BCnKanad%C4%B1",
  },
];

export const ourWorks = [
  {
    title: "Topluluk Buluşması",
    description:
      "Üyelerimizle bir araya geldiğimiz, fikir alışverişi yaptığımız etkinlik.",
    image:
      "https://kultur.istanbul/gorsel/2020/01/t%C3%BCrk-d%C3%BCnyas%C4%B1-bulu%C5%9Fmas%C4%B1.jpg",
  },
  {
    title: "Gençlik Atölyesi",
    description: "Gençler için düzenlenen eğitim ve geliştirme atölyeleri.",
    image: "https://bandirmamanset.com/resimler/2023-12/9/101276979838652.webp",
  },
  {
    title: "Sosyal Sorumluluk Projesi",
    description: "Toplumsal farkındalık yaratmak için yürüttüğümüz projeler.",
    image:
      "https://kbumedya.karabuk.edu.tr/uploads/5789770693200693520_dims__1920x1079.jpg",
  },
  {
    title: "Kültürel Etkinlik",
    description: "Türk kültürünü tanıtmak ve yaymak için yapılan etkinlikler.",
    image:
      "https://www.pevkolej.com/wp-content/uploads/2018/05/IMG_20180516_113707_1280x720.jpg",
  },
  {
    title: "Online Seminer",
    description: "Uzaktan eğitim ve bilgilendirme seminerlerimiz.",
    image:
      "https://cdn.prod.website-files.com/6502e7865e2946d1b1a37d80/65d32c940fc7cc053bd4c4fe_See%20Everyone%20On%20Google%20Meet.webp",
  },
  {
    title: "Anıtkabir Ziyareti",
    description:
      "Topluluk üyelerimizle gerçekleştirdiğimiz anlamlı ve saygı dolu Anıtkabir ziyareti.",
    image:
      "https://egestkrotasi.com/wp-content/uploads/2020/06/IMG_5574-3-1-960x720.jpg",
  },
];

export const announcements = [
  {
    id: 1,
    title: "Yeni Ürün Lansmanı",
    description:
      "Şirketimizin en yeni teknoloji ürünü pazara sunuluyor. Bu devrim niteliğindeki ürün ile sektörde öncü konumumuzu pekiştiriyoruz.",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
    date: "2024-09-15",
  },
  {
    id: 2,
    title: "Eğitim Semineri Duyurusu",
    description:
      "Personel gelişim programımız kapsamında düzenlenecek eğitim seminerine tüm çalışanlarımız davetlidir.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop",
    date: "2024-09-20",
  },
  {
    id: 3,
    title: "Ofis Taşınma Bildirimi",
    description:
      "Merkez ofisimiz yeni adresine taşınmaktadır. Yeni ofisimiz daha modern ve ferah bir çalışma ortamı sunacak.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
    date: "2024-09-25",
  },
  {
    id: 4,
    title: "Yıl Sonu Partisi",
    description:
      "2024 yılının başarılı geçmesini kutlamak için düzenlenen yıl sonu partisine tüm ekip üyeleri ve aileleri davetlidir.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop",
    date: "2024-12-28",
  },
  {
    id: 5,
    title: "Sistem Bakım Duyurusu",
    description:
      "Sunucu sistemlerimizde planlı bakım çalışması yapılacaktır. Bu süre zarfında sistemlerimize erişim kısıtlı olacaktır.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    date: "2024-09-22",
  },
  {
    id: 6,
    title: "İnsan Kaynakları Politika Güncellemesi",
    description:
      "Şirket politikalarımızda yapılan güncellemeler hakkında bilgilendirme toplantısı düzenlenecektir.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    date: "2024-09-18",
  },
  {
    id: 7,
    title: "Müşteri Memnuniyeti Anketi",
    description:
      "Hizmet kalitemizi artırmak amacıyla müşteri memnuniyeti anketi başlatıldı. Katılımınız bizim için çok değerli.",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
    date: "2024-09-16",
  },
  {
    id: 8,
    title: "Sosyal Sorumluluk Projesi",
    description:
      "Çevre koruma kapsamında başlattığımız ağaçlandırma projesine gönüllü katılım için başvurular alınmaktadır.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    date: "2024-10-05",
  },
  {
    id: 9,
    title: "Teknoloji Konferansı",
    description:
      "Sektördeki son gelişmeleri ve teknolojik yenilikleri ele alacağımız konferansa katılım için kayıt yaptırabilirsiniz.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop",
    date: "2024-10-12",
  },
  {
    id: 10,
    title: "Başarı Ödülleri Töreni",
    description:
      "Yılın en başarılı çalışanları ve projeleri için düzenlenen ödül töreni gerçekleştirilecektir.",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop",
    date: "2024-11-15",
  },
];

export const provinces = {
  "1": "ADANA",
  "2": "ADIYAMAN",
  "3": "AFYONKARAHİSAR",
  "4": "AĞRI",
  "5": "AMASYA",
  "6": "ANKARA",
  "7": "ANTALYA",
  "8": "ARTVİN",
  "9": "AYDIN",
  "10": "BALIKESİR",
  "11": "BİLECİKK",
  "12": "BİNGÖL",
  "13": "BİTLİS",
  "14": "BOLU",
  "15": "BURDUR",
  "16": "BURSA",
  "17": "ÇANAKKALE",
  "18": "ÇANKIRI",
  "19": "ÇORUM",
  "20": "DENİZLİ",
  "21": "DİYARBAKIR",
  "22": "EDİRNE",
  "23": "ELAZIĞ",
  "24": "ERZİNCAN",
  "25": "ERZURUM",
  "26": "ESKİŞEHİR",
  "27": "GAZİANTEP",
  "28": "GİRESUN",
  "29": "GÜMÜŞHANE",
  "30": "HAKKARİ",
  "31": "HATAY",
  "32": "ISPARTA",
  "33": "MERSİN",
  "34": "İSTANBUL",
  "35": "İZMİR",
  "36": "KARS",
  "37": "KASTAMONU",
  "38": "KAYSERİ",
  "39": "KIRKLARELİ",
  "40": "KIRŞEHİR",
  "41": "KOCAELİ",
  "42": "KONYA",
  "43": "KÜTAHYA",
  "44": "MALATYA",
  "45": "MANİSA",
  "46": "KAHRAMANMARAŞ",
  "47": "MARDİN",
  "48": "MUĞLA",
  "49": "MUŞ",
  "50": "NEVŞEHİR",
  "51": "NİĞDE",
  "52": "ORDU",
  "53": "RİZE",
  "54": "SAKARYA",
  "55": "SAMSUN",
  "56": "SİİRT",
  "57": "SİNOP",
  "58": "SİVAS",
  "59": "TEKİRDAĞ",
  "60": "TOKAT",
  "61": "TRABZON",
  "62": "TUNCELİ",
  "63": "ŞANLIURFA",
  "64": "UŞAK",
  "65": "VAN",
  "66": "YOZGAT",
  "67": "ZONGULDAK",
  "68": "AKSARAY",
  "69": "BAYBURT",
  "70": "KARAMAN",
  "71": "KIRIKKALE",
  "72": "BATMAN",
  "73": "ŞIRNAK",
  "74": "BARTIN",
  "75": "ARDAHAN",
  "76": "IĞDIR",
  "77": "YALOVA",
  "78": "KARABüK",
  "79": "KİLİS",
  "80": "OSMANİYE",
  "81": "DÜZCE",
};

export const sidebarItems = [
  {
    title: "Ana Sayfa",
    url: "/dashboard",
    icon: Home,
    isShow: true,
  },
  {
    title: "Üyeler",
    url: "/users",
    icon: Users,
    isShow: true,
  },
  {
    title: "Duyurular",
    url: "/announcements",
    icon: Megaphone,
    isShow: true,
  },
  {
    title: "Projeler",
    url: "/works",
    icon: Layers,
    isShow: true,
  },
  {
    title: "Profil",
    url: "#",
    icon: User,
    isShow: true,
  },
];
