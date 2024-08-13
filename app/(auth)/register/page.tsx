import RegistrationForm from "../_components/RegistrationForm";
import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Register() {
  const session = await getSession();
  if (session?.user) redirect("/dashboard");
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-4">
      <Tabs defaultValue="student" className="w-full max-w-md">
        <TabsList className="w-full">
          <TabsTrigger value="student" className="w-full">
            Student
          </TabsTrigger>
          <TabsTrigger value="teacher" className="w-full">
            Teacher
          </TabsTrigger>
        </TabsList>
        <TabsContent value="student" asChild>
          <StudentRegister />
        </TabsContent>
        <TabsContent value="teacher" asChild>
          <TeacherRegister />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function StudentRegister() {
  return (
    <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
      <h1 className="text-xl font-black">Welcome to Class Tag</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The one stop solution for marking attendance.
      </p>

      <RegistrationForm role="Student" />
    </div>
  );
}

function TeacherRegister() {
  return (
    <div className="w-full max-w-md rounded-lg border p-6 shadow-md">
      <h1 className="text-xl font-black">Welcome to Class Tag</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        The one stop solution for marking attendance.
      </p>

      <RegistrationForm role="Teacher" />
    </div>
  );
}
