import z from "zod";

const turkishLowerCase = (str: string) =>
  str
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .replace(/Ç/g, "ç")
    .replace(/Ğ/g, "ğ")
    .replace(/Ü/g, "ü")
    .replace(/Ş/g, "ş")
    .replace(/Ö/g, "ö")
    .toLowerCase();

const turkishUpperCase = (str: string) =>
  str
    .replace(/i/g, "İ")
    .replace(/ı/g, "I")
    .replace(/ç/g, "Ç")
    .replace(/ğ/g, "Ğ")
    .replace(/ü/g, "Ü")
    .replace(/ş/g, "Ş")
    .replace(/ö/g, "Ö")
    .toUpperCase();

const capitalizeFirstLetter = (str: string) =>
  str
    .split(" ")
    .map((word) => turkishUpperCase(word[0]) + turkishLowerCase(word.slice(1)))
    .join(" ");

export const RegisterValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Ad ve soyad zorunludur." })
    .min(3, { message: "Ad ve soyad en az 3 karakter olmalıdır." })
    .max(100, { message: "Ad ve soyad en fazla 100 karakter olabilir." })
    .regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, {
      message: "Ad ve soyad sadece harflerden oluşmalıdır.",
    })
    .transform(capitalizeFirstLetter),

  birthDate: z
    .string()
    .min(1, { message: "Doğum yılı zorunludur." })
    .refine(
      (year) => {
        const currentYear = new Date().getFullYear();
        const birthDate = parseInt(year);
        return birthDate >= 1946 && birthDate <= 2013;
      },
      { message: "Doğum yılı 1946-2006 arasında olmalıdır." }
    ),

  phoneNumber: z
    .string()
    .min(1, { message: "Telefon numarası zorunludur." })
    .regex(/^5\d{2} \d{3} \d{2} \d{2}$/, {
      message: "Geçerli bir telefon numarası giriniz. (5XX XXX XX XX)",
    })
    .transform((val: string) => {
      const digits = val.replace(/\s/g, "");
      return digits;
    }),

  profession: z
    .string()
    .min(1, { message: "Meslek bilgisi zorunludur." })
    .min(2, { message: "Meslek en az 2 karakter olmalıdır." })
    .max(100, { message: "Meslek en fazla 100 karakter olabilir." })
    .transform(capitalizeFirstLetter),

  department: z
    .string()
    .max(150, { message: "Bölüm adı en fazla 150 karakter olabilir." })
    .transform((val) => (val.trim() === "" ? "" : capitalizeFirstLetter(val)))
    .or(z.literal("")),

  email: z
    .string()
    .min(1, { message: "E-posta adresi zorunludur." })
    .email({ message: "Geçerli bir e-posta adresi giriniz." })
    .transform((val) => val.trim())
    .transform(turkishLowerCase),

  skills: z
    .string()
    .min(1, { message: "Yetenek ve hobi bilgisi zorunludur." })
    .min(10, { message: "Yetenek ve hobiler en az 10 karakter olmalıdır." })
    .max(1000, {
      message: "Yetenek ve hobiler en fazla 1000 karakter olabilir.",
    }),

  reason: z
    .string()
    .min(1, { message: "Katılma nedeni zorunludur." })
    .min(20, { message: "Katılma nedeni en az 20 karakter olmalıdır." })
    .max(1000, { message: "Katılma nedeni en fazla 1000 karakter olabilir." }),

  city: z.string().min(1, { message: "Şehir seçimi zorunludur." }),
});

export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  if (digits.length > 0 && !digits.startsWith("5")) {
    return "";
  }

  const truncated = digits.slice(0, 10);

  if (truncated.length <= 3) {
    return truncated;
  } else if (truncated.length <= 6) {
    return `${truncated.slice(0, 3)} ${truncated.slice(3)}`;
  } else if (truncated.length <= 8) {
    return `${truncated.slice(0, 3)} ${truncated.slice(3, 6)} ${truncated.slice(
      6
    )}`;
  } else {
    return `${truncated.slice(0, 3)} ${truncated.slice(3, 6)} ${truncated.slice(
      6,
      8
    )} ${truncated.slice(8)}`;
  }
};

export const SigninValidation = z.object({
  email: z.string().email({ message: "Geçersiz e-posta adresi." }),
  password: z.string().min(8, { message: "Şifre en az 8 karakter olmalıdır." }),
});
