"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { useGlobalContext } from "@/context/globalContext";

const protectedNavLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
];
const publicNavLinks = [
  {
    href: "/login",
    label: "Login",
  },
  {
    href: "/register",
    label: "Register",
  },
];

export default function Navbar() {
  const { isAuthenticated, isLoading } = useGlobalContext();

  return (
    <nav className="flex h-16 w-full items-center justify-center px-6 shadow-sm">
      <div className="flex h-full w-full max-w-screen-xl items-center justify-between">
        <Link href={"/"} className="flex select-none items-center gap-3">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={800}
            height={800}
            className="size-28"
          />
        </Link>

        {!isAuthenticated && !isLoading && (
          <div className="flex items-center gap-5">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {isAuthenticated && !isLoading && (
          <div className="flex items-center gap-5">
            {protectedNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:underline"
              >
                {link.label}
              </Link>
            ))}
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
}
