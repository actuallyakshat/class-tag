import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ClassroomsForStudents from "./_components/ClassroomsForStudents";
import ClassroomsForTeachers from "./_components/ClassroomsForTeachers";

export default async function Classrooms() {
  const session = await auth();
  const userRole = session?.user?.role;
  console.log("USER ROLE", userRole);

  if (!userRole) {
    redirect("/login");
  }

  if (userRole === "TEACHER") {
    return <ClassroomsForTeachers />;
  } else if (userRole === "STUDENT") {
    return <ClassroomsForStudents />;
  }
}
