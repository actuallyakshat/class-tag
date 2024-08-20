import prisma from "@/db";
import getSession from "@/lib/getSession";
import AddClassroomButton from "./AddClassroomButton";
import ClassroomCard from "./ClassroomCard";
import RedirectToLogin from "@/components/utility/RedirectToLogin";

export default async function ClassroomsForTeachers() {
  const session = await getSession();
  const user = session?.user;

  if (!session) {
    return <RedirectToLogin />;
  }

  const classrooms = await prisma.classroom.findMany({
    where: {
      teacherId: user?.id,
    },
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="grid w-full grid-cols-2 gap-4 lg:grid-cols-3">
        <AddClassroomButton />
        {classrooms.map((classroom) => (
          <ClassroomCard
            key={classroom.id}
            headerUrl={classroom.headerUrl}
            title={classroom.name}
            href={`/classroom/${classroom.id}`}
          />
        ))}
      </div>
    </div>
  );
}
