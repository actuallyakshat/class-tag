"use client";
import { AttendanceRecord } from "@prisma/client";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { deleteAttendanceRecord } from "../_actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AttendanceOptions({
  attendanceRecord,
  classroomId,
}: {
  attendanceRecord: AttendanceRecord;
  classroomId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const attendanceOptions = [
    {
      label: "Export as CSV",
      action: () => console.log("Export as CSV"),
    },
    {
      label: "Delete all responses",
      action: () => console.log("Delete all responses"),
    },
    {
      label: "Delete attendance",
      action: async () => {
        setLoading(true);
        try {
          toast.loading("Deleting attendance...", {
            id: "deleting-attendance",
          });
          const response = await deleteAttendanceRecord(
            attendanceRecord.id,
            classroomId,
          );
          if (response.success) {
            toast.success("Attendance deleted successfully", {
              id: "deleting-attendance",
            });
            router.push("/classroom/" + classroomId);
          } else {
            toast.error(response.error, { id: "deleting-attendance" });
            setLoading(false);
          }
        } catch (e: any) {
          toast.error(e.message, { id: "deleting-attendance" });
          setLoading(false);
        }
      },
    },
  ];

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <button>
            <Ellipsis className="h-5 w-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="mr-5 w-[200px] p-0">
          {attendanceOptions.map((option) => (
            <button
              onClick={option.action}
              disabled={loading}
              key={option.label}
              className="w-full px-4 py-2 text-left text-sm font-medium transition-colors hover:bg-muted"
            >
              {option.label}
            </button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
