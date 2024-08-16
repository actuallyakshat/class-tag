"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, UserRoundPlus } from "lucide-react";
import { toast } from "sonner";

export default function InviteButton({ inviteLink }: { inviteLink: string }) {
  function copyToClipboard() {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Copied to clipboard");
  }

  return (
    <Dialog>
      <DialogTrigger>
        <UserRoundPlus />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite students</DialogTitle>
          <DialogDescription>
            Share this link with your students to join the classroom.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-3 rounded-md border bg-zinc-100 p-3 text-sm">
          {inviteLink}
          <button>
            <Copy className="h-4 w-4" onClick={copyToClipboard} />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
