"use server";

import prisma from "@/db";
import { revalidatePath } from "next/cache";

export async function addAttendanceRecord(
  classroomId: string,
  date: Date,
  teacherId: string,
) {
  try {
    const existingAttendanceRecord = await prisma.attendanceRecord.findFirst({
      where: {
        classroomId,
        date,
      },
      select: {
        id: true,
      },
    });

    if (existingAttendanceRecord) {
      return {
        success: false,
        error: "Attendance record already exists for this date",
        data: null,
      };
    }

    const attendanceRecord = await prisma.attendanceRecord.create({
      data: {
        teacherId,
        classroomId,
        date,
      },
    });

    revalidatePath("/dashboard/classroom/" + classroomId);
    return {
      success: true,
      error: null,
      data: attendanceRecord,
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}
