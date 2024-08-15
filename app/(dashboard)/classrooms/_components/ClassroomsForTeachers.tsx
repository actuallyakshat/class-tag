import prisma from "@/db";
import getSession from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";
import AddClassroomButton from "./AddClassroomButton";

export default async function ClassroomsForTeachers() {
  const session = await getSession();
  const user = session?.user;

  if (!session) {
    redirect("/login");
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
            {...classroom}
            headerUrl={classroom.headerUrl}
            title={classroom.name}
            href={`/classroom/${classroom.id}`}
          />
        ))}
      </div>
    </div>
  );
}

interface ClassroomCardProps {
  title: string;
  href: string;
  headerUrl: string;
}

function ClassroomCard(props: ClassroomCardProps) {
  return (
    <Link
      href={props.href}
      className="col-span-1 flex cursor-pointer flex-col rounded-lg border shadow-sm"
    >
      <div
        className="h-[100px] w-full rounded-t-lg"
        style={{
          backgroundImage: `url(${props.headerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col p-4">
        <h2 className="font-black">{props.title}</h2>
      </div>
    </Link>
  );
}
