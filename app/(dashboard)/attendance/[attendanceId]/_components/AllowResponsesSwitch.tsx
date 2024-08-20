import { Switch } from "@/components/ui/switch";
import React from "react";

export default function AllowResponsesSwitch() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-md border p-6">
      <p className="text-sm font-medium">Accepting Responses</p>
      <Switch />
    </div>
  );
}
