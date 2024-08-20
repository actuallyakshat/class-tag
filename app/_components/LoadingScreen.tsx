import { LoaderCircle } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="size-8 animate-spin" />
    </div>
  );
}
