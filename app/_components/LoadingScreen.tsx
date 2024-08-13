import { LoaderCircle } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin" />
    </div>
  );
}
