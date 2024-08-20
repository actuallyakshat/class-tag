import prisma from "@/db";
import getSession from "@/lib/getSession";
import DeleteClassroomButton from "./_components/DeleteClassroomButton";
import InviteButton from "./_components/InviteButton";
import { Button } from "@/components/ui/button";
import TakeAttendanceButton from "./_components/TakeAttendanceButton";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function Classroom({
  params,
}: {
  params: { classroomId: string };
}) {
  const session = await getSession();

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
      attendanceRecords: {
        orderBy: {
          date: "desc",
        },
      },
    },
  });

  if (!classroomDetails)
    return (
      <p className="flex size-full items-center justify-center text-xl font-medium">
        Classroom not found
      </p>
    );

  if (classroomDetails.teacher?.userId != session?.user?.id) {
    return (
      <p className="flex size-full items-center justify-center text-xl font-medium">
        You are not authorized to view this classroom.
      </p>
    );
  }
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">{classroomDetails?.name}</h1>
          <p className="mt-1 text-sm font-bold text-muted-foreground">
            Classroom by: {classroomDetails?.teacher?.user?.name}
          </p>
        </div>

        {session && session?.user?.role == "TEACHER" && (
          <div className="flex items-center gap-3">
            <InviteButton inviteLink={classroomDetails?.inviteLink!} />
            <DeleteClassroomButton classroomId={params.classroomId} />
          </div>
        )}
      </div>
      {session && session?.user?.role == "TEACHER" && (
        <div className="mt-4">
          <TakeAttendanceButton classroomId={params.classroomId} />
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-2xl font-bold">Attendance Records</h2>
        {classroomDetails?.attendanceRecords.map((attendanceRecord) => (
          // <AttendanceRecord attendanceRecord={attendanceRecord} />
          <div key={attendanceRecord.id}>
            <Link href={"/attendance/" + attendanceRecord.id}>
              <p>{formatDate(attendanceRecord.date)}</p>
            </Link>
          </div>
        ))}
        {classroomDetails?.attendanceRecords.length == 0 && (
          <p className="text-muted-foreground">No attendance recorded yet.</p>
        )}
      </div>
    </div>
  );
}
