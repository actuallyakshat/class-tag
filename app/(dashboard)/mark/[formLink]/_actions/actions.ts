"use server";

import prisma from "@/db";

export async function markAttendance(formId: string, studentId: string) {
  if (!formId?.trim() || !studentId?.trim()) {
    return {
      success: false,
      error: "Invalid form link or student ID",
      data: null,
    };
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const attendanceRecord = await tx.attendanceRecord.findFirst({
        where: {
          id: formId,
          attendanceResponses: {
            none: {
              studentId,
            },
          },
        },
        include: {
          classroom: {
            select: {
              students: {
                where: {
                  id: studentId,
                },
              },
            },
          },
        },
      });

      if (!attendanceRecord) {
        throw new Error("Form not found or attendance already marked");
      }

      if (attendanceRecord.classroom.students.length === 0) {
        throw new Error("Student not found in the classroom");
      }

      await tx.attendanceResponse.create({
        data: {
          studentId,
          attendanceId: formId,
        },
      });

      return {
        success: true,
        error: null,
        data: formId,
      };
    });

    return result;
  } catch (error: any) {
    console.error("Error marking attendance:", error);
    return {
      success: false,
      error: error.message || "Something went wrong",
      data: null,
    };
  }
}
