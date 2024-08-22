"use server";
import prisma from "@/db";
import { generateRandomFormLink } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deleteAttendanceRecord(
  attendanceId: string,
  classroomId: string,
) {
  try {
    if (!attendanceId)
      return { success: false, error: "ID is missing", data: null };
    const attendanceRecord = await prisma.attendanceRecord.findUnique({
      where: {
        id: attendanceId,
      },
    });

    if (!attendanceRecord) {
      return {
        success: false,
        error: "Attendance record not found",
        data: null,
      };
    }

    await prisma.attendanceRecord.delete({
      where: {
        id: attendanceId,
      },
    });

    revalidatePath("/classroom/" + classroomId);
    return { success: true, error: null, data: null };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}

export async function refreshFormLink(attendanceId: string) {
  try {
    if (!attendanceId)
      return { success: false, error: "ID is missing", data: null };

    const form = await prisma.attendanceRecord.findUnique({
      where: {
        id: attendanceId,
      },
    });

    if (!form) {
      return {
        success: false,
        error: "Form not found",
        data: null,
      };
    }

    const newRandomFormLink = generateRandomFormLink();

    await prisma.attendanceRecord.update({
      where: {
        id: attendanceId,
      },
      data: {
        temporaryFormLink: newRandomFormLink,
      },
    });

    return { success: true, error: null, data: newRandomFormLink };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}

export async function getPresentStudents(attendanceId: string) {
  try {
    if (!attendanceId)
      return { success: false, error: "ID is missing", data: null };

    const attendanceRecord = await prisma.attendanceRecord.findUnique({
      where: {
        id: attendanceId,
      },
    });

    if (!attendanceRecord) {
      return {
        success: false,
        error: "Attendance record not found",
        data: null,
      };
    }

    const presentStudents = await prisma.attendanceResponse.findMany({
      where: {
        attendanceId: attendanceId,
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return { success: true, error: null, data: presentStudents };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message, data: null };
  }
}
