import RedirectToLogin from "@/components/utility/RedirectToLogin";
import prisma from "@/db";
import getSession from "@/lib/getSession";
import { formatDate } from "@/lib/utils";
import MarkAttendanceButton from "./_components/MarkAttendanceButton";

export default async function page({ params }: any) {
  const { formLink } = params;

  const session = await getSession();
  if (!session) {
    return <RedirectToLogin />;
  } else if (session.user!.role === "TEACHER") {
    return (
      <div className="flex flex-col items-center justify-center">
        Only students can mark their attendance.
      </div>
    );
  }

  const form = await prisma.attendanceRecord.findUnique({
    where: {
      temporaryFormLink: formLink,
    },
    include: {
      classroom: {
        include: {
          students: true,
        },
      },
    },
  });

  const student = await prisma.student.findUnique({
    where: {
      userId: session.user!.id,
    },
  });

  if (!student) {
    return <div>Something went wrong</div>;
  }

  if (!form) {
    return <div>This form does not exists or has probably expired.</div>;
  }

  if (!form.classroom.students.some((s) => s.id === student.id)) {
    return <div>You are not enrolled in this class</div>;
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-md border p-8 shadow-lg">
        <h1 className="text-3xl font-semibold">{form.classroom.name}</h1>
        <h2>Date: {formatDate(form.date)}</h2>
        <MarkAttendanceButton
          formId={form.id}
          studentId={student.id}
          classroomId={form.classroom.id}
        />
      </div>
    </div>
  );
}
