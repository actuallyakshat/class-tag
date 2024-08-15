"use server";

import prisma from "@/db";
import { headerImages } from "@/lib/headerImages";

import { generateInviteLink } from "@/lib/utils";
import { revalidatePath } from "next/cache";
export async function createClassroom(
  classroomName: string,
  teacherId: string,
) {
  try {
    const randomHeaderUrl =
      headerImages[Math.floor(Math.random() * headerImages.length)];
    const classroom = await prisma.classroom.create({
      data: {
        inviteLink: generateInviteLink(),
        name: classroomName,
        teacherId,
        headerUrl: randomHeaderUrl,
      },
    });
    revalidatePath("/classrooms");
    return { success: true, error: null, data: classroom };
  } catch (error) {
    console.error(error);
    return { success: false, error, data: null };
  }
}

export async function deleteClassroom(classroomId: string) {
  try {
    await prisma.classroom.delete({
      where: {
        id: classroomId,
      },
    });
    revalidatePath("/classrooms");
    return { success: true, error: null, data: null };
  } catch (error) {
    console.error(error);
    return { success: false, error, data: null };
  }
}
