"use client";
import FormItem from "@/app/(auth)/_components/FormItem";
import FormSubmissionButton from "@/app/(auth)/_components/FormSubmissionButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGlobalContext } from "@/context/globalContext";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createClassroom } from "../_actions/actions";
import { useRef, useState } from "react";

export default function AddClassroomButton() {
  const { user } = useGlobalContext();
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function resetForm() {
    formRef.current?.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="col-span-1 flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed shadow-sm">
          <i>
            <Plus className="stroke-1" />
          </i>
          <p className="text-sm font-medium">Add Classroom</p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Classroom</DialogTitle>
          <form
            ref={formRef}
            action={async (formData: FormData) => {
              if (user?.role !== "TEACHER") {
                toast.error("You are not authorized to add classrooms");
                return;
              }

              const classroomName = formData.get("classroomName") as string;
              const teacherId = user?.id;

              if (!classroomName || !teacherId) {
                toast.error("Classroom name is required");
                return;
              }

              try {
                const response = await createClassroom(
                  classroomName,
                  teacherId,
                );

                if (response.success) {
                  toast.success("Classroom added successfully");
                  setOpen(false);
                  resetForm();
                  return;
                } else {
                  toast.error("Something went wrong");
                  return;
                }
              } catch (error) {
                console.error(error);
                toast.error("Something went wrong");
                return;
              }
            }}
            className="flex flex-col gap-3 pb-2 pt-4"
          >
            <FormItem
              placeholder="Enter classroom name"
              name="classroomName"
              type="text"
              label="Classroom Name"
            />
            <FormSubmissionButton label="Add Classroom" />
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
