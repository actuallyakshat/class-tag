import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ClassroomsForStudents from "./_components/ClassroomsForStudents";
import ClassroomsForTeachers from "./_components/ClassroomsForTeachers";
import RedirectToLogin from "@/components/utility/RedirectToLogin";

export default async function Classrooms() {
  const session = await auth();
  const userRole = session?.user?.role;
  console.log("USER ROLE", userRole);

  if (!userRole) {
    return <RedirectToLogin />;
  }

  if (userRole === "TEACHER") {
    return <ClassroomsForTeachers />;
  } else if (userRole === "STUDENT") {
    return <ClassroomsForStudents />;
  }
}
