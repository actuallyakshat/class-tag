"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { markAttendance } from "../_actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function MarkAttendanceButton({
  formId,
  studentId,
  classroomId,
}: {
  formId: string;
  studentId: string;
  classroomId: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleMarkAsPresent() {
    try {
      toast.loading("Marking your attendance...", { id: "mark-as-present" });
      setLoading(true);
      const response = await markAttendance(formId, studentId);
      if (response.success) {
        toast.success("Attendance marked as present", {
          id: "mark-as-present",
        });
        router.push("/classroom/" + classroomId);
      } else {
        toast.error(response.error, { id: "mark-as-present" });
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      toast.error("Error marking attendance", { id: "mark-as-present" });
    }
  }

  return (
    <Button onClick={handleMarkAsPresent} disabled={loading}>
      Mark as Present
    </Button>
  );
}
