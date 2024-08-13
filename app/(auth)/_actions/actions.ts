"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/db";
import bcrypt, { compare } from "bcryptjs";
import { CredentialsSignin } from "next-auth";

export async function registerUser(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new Error("Missing required fields");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, error: null, data: newUser };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Missing required fields");
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    return { success: true, error: null, data: null };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Invalid Credentials", data: null };
  }
}

export async function logoutUser() {
  await signOut();
  return { success: true, error: null, data: null };
}
