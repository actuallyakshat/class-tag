"use server";

import prisma from "@/db";

export async function joinClassroom(classroomId: string, studentId: string) {
  try {
    const classroom = await prisma.classroom.findUnique({
      where: {
        id: classroomId,
      },
      include: {
        students: true,
      },
    });
    if (!classroom) throw new Error("Classroom not found");
    if (
      classroom.students.filter((student) => student.id == studentId).length > 0
    )
      throw new Error("Student already in classroom");

    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
    if (!student) throw new Error("Student not found");

    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        classrooms: {
          connect: {
            id: classroomId,
          },
        },
      },
    });

    await prisma.classroom.update({
      where: {
        id: classroomId,
      },
      data: {
        students: {
          connect: {
            id: studentId,
          },
        },
      },
    });

    const newClassroomStudent = prisma.classroomStudent.create({
      data: {
        classroomId,
        studentId,
        joinedAt: new Date(),
      },
    });

    return {
      success: true,
      error: null,
      data: newClassroomStudent,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
}
