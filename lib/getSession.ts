"use server";
import { auth } from "@/auth";
import { cache } from "react";

const getSession = cache(async () => {
  const session = await auth();
  return session;
});

export default getSession;
