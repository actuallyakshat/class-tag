import prisma from "@/db";
import DeleteClassroomButton from "./_components/DeleteClassroomButton";
import { UserRoundPlus } from "lucide-react";
import InviteButton from "./_components/InviteButton";

export default async function Classroom({
  params,
}: {
  params: { classroomId: string };
}) {
  const classroomDetails = await prisma.classroom.findUnique({
    where: {
      id: params.classroomId,
    },
    include: {
      teacher: {
        include: {
          user: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">{classroomDetails?.name}</h1>
          <p className="mt-1 text-sm font-bold text-muted-foreground">
            Classroom by: {classroomDetails?.teacher?.user?.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <InviteButton inviteLink={classroomDetails?.inviteLink!} />
          <DeleteClassroomButton classroomId={params.classroomId} />
        </div>
      </div>
    </div>
  );
}
