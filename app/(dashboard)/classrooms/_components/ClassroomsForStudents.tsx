import RedirectToLogin from "@/components/utility/RedirectToLogin";
import prisma from "@/db";
import getSession from "@/lib/getSession";
import React from "react";
import ClassroomCard from "./ClassroomCard";

export default async function ClassroomsForStudents() {
  const session = await getSession();
  if (!session) return <RedirectToLogin />;

  const student = await prisma.student.findUnique({
    where: {
      userId: session.user?.id,
    },
    include: {
      classrooms: true,
    },
  });

  return (
    <div className="grid w-full grid-cols-3 gap-4">
      {student?.classrooms.map((classroom) => (
        <ClassroomCard
          title={classroom.name}
          href={`/classroom/${classroom.id}`}
          headerUrl={classroom.headerUrl}
          key={classroom.id}
        />
      ))}
    </div>
  );
}
