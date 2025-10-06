"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

interface SignUpExtra {
  birthDate: string;
  phoneNumber: string;
  profession: string;
  department: string;
  skills: string;
  reason: string;
  city: string;
  role: string;
  image?: string;
}

export const signUp = async (
  email: string,
  password: string,
  name: string,
  image: string,
  extra: SignUpExtra
) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      image: image,
      callbackURL: "/dashboard",
      ...extra,
    },
  });
  return result;
};

export const signIn = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "Kullanıcı bulunamadı",
      };
    }

    if (user.role !== "admin" && user.role !== "editor") {
      return {
        success: false,
        error: "Kullanıcı bulunamadı",
      };
    }

    const result = await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: "/dashboard",
      },
    });

    if (!result || !result.user) {
      return {
        success: false,
        error: "Geçersiz email veya parola",
      };
    }

    return { success: true, data: result };
  } catch (error: any) {
    let errorMessage = "Giriş işlemi başarısız oldu";

    if (error.message) {
      const msg = error.message.toLowerCase();

      if (msg.includes("invalid") || msg.includes("credentials")) {
        errorMessage = "Geçersiz email veya parola";
      } else if (msg.includes("password")) {
        errorMessage = "Parola yanlış";
      } else if (msg.includes("account") && msg.includes("locked")) {
        errorMessage =
          "Hesabınız kilitlenmiş. Lütfen destek ile iletişime geçin";
      } else if (msg.includes("verified") || msg.includes("verification")) {
        errorMessage = "Email adresinizi doğrulamanız gerekiyor";
      } else {
        errorMessage = error.message;
      }
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
};
