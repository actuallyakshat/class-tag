"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "./DatePicker";
import { addAttendanceRecord } from "../_actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";

export default function TakeAttendanceButton({
  classroomId,
}: {
  classroomId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [date, setDate] = React.useState<Date>(new Date());
  const router = useRouter();
  const { user } = useGlobalContext();

  async function handleTakeAttendance() {
    setLoading(true);
    if (!user?.teacherId) return;
    try {
      const response = await addAttendanceRecord(
        classroomId,
        date,
        user.teacherId,
      );
      if (response.success) {
        toast.success("Attendance record added successfully");
        router.push("/attendance/" + response.data!.id);
      } else {
        console.error(response.error);
        setLoading(false);
        toast.error(response.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Take Attendance</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Take Attendance</DialogTitle>
          <DialogDescription>
            Select the date you want to take attendance for.
          </DialogDescription>
        </DialogHeader>
        <DatePicker date={date} setDate={setDate} />
        <Button onClick={handleTakeAttendance} disabled={loading}>
          {loading ? "Please wait..." : "Take Attendance"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
