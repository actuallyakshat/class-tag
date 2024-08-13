"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/db";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData, role: string) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    const name = firstName + " " + lastName;

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
        name,
        email,
        password: hashedPassword,
        role: role === "Teacher" ? Role.TEACHER : Role.STUDENT,
      },
    });

    return { success: true, error: null, data: newUser };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}

export async function loginUser(formData: FormData, role: string) {
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
      role: role === "Teacher" ? Role.TEACHER : Role.STUDENT,
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

export async function getUserDetails(id: string) {
  try {
    if (!id) return { success: false, error: "ID is missing", data: null };
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        teacher: true,
        student: true,
      },
    });
    return { success: true, error: null, data: user };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}
