"use server";
import { auth } from "@/auth";
import { cache } from "react";

const getSession = async () => {
  const session = await auth();
  return session;
};

export default getSession;
