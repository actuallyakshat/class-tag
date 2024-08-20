"use client";
import { deleteClassroom } from "@/app/(dashboard)/classrooms/_actions/actions";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeleteClassroomButtonProps {
  classroomId: string;
}

export default function DeleteClassroomButton(
  props: DeleteClassroomButtonProps,
) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleDeleteClassroom() {
    try {
      setLoading(true);
      const response = await deleteClassroom(props.classroomId);
      if (response.success) {
        toast.success("Classroom deleted successfully");
        router.push("/classrooms");
      } else {
        toast.error("Something went wrong");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center justify-center rounded-md border p-3">
          <Trash2 className="size-5" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Classroom</DialogTitle>
          <DialogDescription>
            You are about to delete this classroom. All the attendance data will
            be lost. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full">
          <DialogClose asChild>
            <Button
              disabled={loading}
              className="w-full border border-zinc-400 bg-white"
              variant={"secondary"}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            className="w-full"
            onClick={handleDeleteClassroom}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
