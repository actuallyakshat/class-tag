"use client";

import { useEffect, useState } from "react";
import { getPresentStudents } from "../_actions/actions";

export default function PresentStudentsList({
  attendanceId,
}: {
  attendanceId: string;
}) {
  const [presentStudents, setPresentStudents] = useState<any>([]);

  //   useEffect(() => {
  //     const interval = setInterval(async () => {
  //       const response = await getPresentStudents(attendanceId);
  //       if (response.success) {
  //         console.log(response.data);
  //         setPresentStudents(response.data);
  //       }
  //     }, 30000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [attendanceId]);

  return (
    <div className="mt-5">
      <h2 className="font-3xl font-extrabold">Present Studnets</h2>
      <div className="mt-2 flex flex-col gap-2">
        {presentStudents.map((student: any) => (
          <StudentListItem student={student} key={student.student.id} />
        ))}
      </div>
    </div>
  );
}

function StudentListItem({ student }: { student: any }) {
  return (
    <div className="flex w-full items-center gap-5">
      <h4 className="text-xl font-medium">{student.student.user.name}</h4>
      <p className="text-sm text-muted-foreground">
        ({student.student.user.email})
      </p>
    </div>
  );
}
