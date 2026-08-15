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
    .min(1, { message: "Full name is required." })
    .min(3, { message: "Full name must be at least 3 characters." })
    .max(100, { message: "Full name cannot exceed 100 characters." })
    .regex(/^[a-zA-ZçğıöşüÇĞIİÖŞÜ\s]+$/, {
      message: "Full name may contain letters and spaces only.",
    })
    .transform(capitalizeFirstLetter),

  birthDate: z
    .string()
    .min(1, { message: "Birth year is required." })
    .refine(
      (year) => {
        const currentYear = new Date().getFullYear();
        const birthDate = parseInt(year);
        return birthDate >= 1946 && birthDate <= 2013;
      },
      { message: "Birth year must be between 1946 and 2013." }
    ),

  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^5\d{2} \d{3} \d{2} \d{2}$/, {
      message: "Enter a valid phone number. (5XX XXX XX XX)",
    })
    .transform((val: string) => {
      const digits = val.replace(/\s/g, "");
      return digits;
    }),

  profession: z
    .string()
    .min(1, { message: "Profession is required." })
    .min(2, { message: "Profession must be at least 2 characters." })
    .max(100, { message: "Profession cannot exceed 100 characters." })
    .transform(capitalizeFirstLetter),

  department: z
    .string()
    .max(150, { message: "Field of study cannot exceed 150 characters." })
    .transform((val) => (val.trim() === "" ? "" : capitalizeFirstLetter(val)))
    .or(z.literal("")),

  email: z
    .string()
    .min(1, { message: "Email address is required." })
    .email({ message: "Enter a valid email address." })
    .transform((val) => val.trim())
    .transform(turkishLowerCase),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Za-z]/, { message: "Password must contain at least one letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),

  confirmPassword: z.string().min(1, { message: "Please confirm your password." }),

  skills: z
    .string()
    .min(1, { message: "Skills and interests are required." })
    .min(10, { message: "Please write at least 10 characters." })
    .max(1000, {
      message: "Skills and interests cannot exceed 1000 characters.",
    }),

  reason: z
    .string()
    .min(1, { message: "Please tell us why you want to join." })
    .min(20, { message: "Please write at least 20 characters." })
    .max(1000, { message: "Your answer cannot exceed 1000 characters." }),

  city: z.string().min(1, { message: "Please select a city." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
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
  email: z.string().email({ message: "Enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
