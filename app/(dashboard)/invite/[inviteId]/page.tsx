import RedirectToLogin from "@/components/utility/RedirectToLogin";
import getSession from "@/lib/getSession";

import prisma from "@/db";
import JoinClassroomButton from "./_components/JoinClassroomButton";

export default async function InvitePage({
  params,
}: {
  params: { inviteId: string };
}) {
  const session = await getSession();
  if (!session) return <RedirectToLogin />;

  if (session.user?.role == "TEACHER")
    return (
      <p className="flex size-full items-center justify-center font-medium">
        Only students can join classrooms
      </p>
    );

  const inviteLink = process.env.APP_URL + "/invite/" + params.inviteId;

  const classroomDetails = await prisma.classroom.findUnique({
    where: {
      inviteLink: inviteLink,
    },
    include: {
      teacher: {
        include: {
          user: true,
        },
      },
      students: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!classroomDetails) return <div>Classroom not found</div>;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-lg flex-col rounded-md border p-6 shadow-sm">
        <h3 className="mb-1 font-light text-muted-foreground">
          You are invited to join a classroom:
        </h3>
        <h1 className="text-3xl font-black">{classroomDetails?.name}</h1>
        <p className="text-sm font-medium text-muted-foreground">
          By {classroomDetails?.teacher?.user?.name}
        </p>
        <JoinClassroomButton classroomId={classroomDetails?.id!} />
      </div>
    </div>
  );
}
