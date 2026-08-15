"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { prisma } from "../prisma";

interface SignUpExtra {
  birthDate: string;
  phoneNumber: string;
  profession: string;
  department: string;
  skills: string;
  reason: string;
  city: string;
  image?: string;
}

interface UpdateProfileData {
  name: string;
  email: string;
  phoneNumber: string | null;
  profession: string | null;
  department: string | null;
  city: string | null;
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
        error: "User not found",
      };
    }

    if (user.role !== "admin") {
      return {
        success: false,
        error: "User not found",
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
        error: "Invalid email or password",
      };
    }

    return { success: true, data: result };
  } catch (error: any) {
    let errorMessage = "Unable to sign in";

    if (error.message) {
      const msg = error.message.toLowerCase();

      if (msg.includes("invalid") || msg.includes("credentials")) {
        errorMessage = "Invalid email or password";
      } else if (msg.includes("password")) {
        errorMessage = "Incorrect password";
      } else if (msg.includes("account") && msg.includes("locked")) {
        errorMessage =
          "Your account is locked. Please contact support.";
      } else if (msg.includes("verified") || msg.includes("verification")) {
        errorMessage = "Please verify your email address";
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

export const updateProfileImage = async (userId: string, image: string) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: image,
      },
    });

    return {
      success: true,
      message: "Profile image updated successfully",
      data: updatedUser,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unable to update profile image",
    };
  }
};

export const updateProfile = async (
  userId: string,
  data: UpdateProfileData
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profession: data.profession,
        department: data.department,
        city: data.city,
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    };
  } catch (error: any) {
    let errorMessage = "Unable to update profile";

    if (error.code === "P2002") {
      errorMessage = "This email address is already in use";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const signOutFromAllDevices = async (userId: string) => {
  try {
    await prisma.session.deleteMany({
      where: {
        userId: userId,
      },
    });

    await auth.api.signOut({ headers: await headers() });

    return {
      success: true,
      message: "Signed out from all devices",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unable to sign out",
    };
  }
};
