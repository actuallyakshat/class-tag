import RedirectToLogin from "@/components/utility/RedirectToLogin";
import prisma from "@/db";
import getSession from "@/lib/getSession";
import { formatDate } from "@/lib/utils";
import AttendanceOptions from "./_components/AttendanceOptions";
import AttendanceSettings from "./_components/AttendanceSettings";
import PresentStudentsList from "./_components/PresentStudentsList";

export default async function AttendancePage({
  params,
}: {
  params: { attendanceId: string };
}) {
  const session = await getSession();

  if (!session) return <RedirectToLogin />;
  else if (session.user?.role != "TEACHER")
    return (
      <p className="flex size-full items-center justify-center">
        You are not authorized to view this page
      </p>
    );

  const attendanceId = params.attendanceId;
  const attendanceRecordDetails = await prisma.attendanceRecord.findUnique({
    where: {
      id: attendanceId,
    },
    include: {
      teacher: true,
      classroom: {
        include: {
          students: true,
        },
      },
    },
  });

  if (!attendanceRecordDetails) {
    return <p>Attendance record not found</p>;
  } else if (attendanceRecordDetails.teacher.userId != session.user?.id) {
    return <p>You are not authorized to view this page</p>;
  }

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="flex items-center gap-4 text-3xl font-bold">
            {attendanceRecordDetails.classroom.name}
            <span className="text-sm font-medium text-muted-foreground">
              ( {attendanceRecordDetails.classroom.students.length}{" "}
              {attendanceRecordDetails.classroom.students.length > 1
                ? "Students"
                : "Student"}{" "}
              )
            </span>
          </h1>
          <p className="font-medium">
            Date: {formatDate(attendanceRecordDetails.date)}
          </p>
        </div>
        <AttendanceOptions
          attendanceRecord={attendanceRecordDetails}
          classroomId={attendanceRecordDetails.classroom.id}
        />
      </div>
      <AttendanceSettings attendanceId={attendanceRecordDetails.id} />
      <PresentStudentsList attendanceId={attendanceRecordDetails.id} />
    </div>
  );
}
