"use client";
import { deleteClassroom } from "@/app/(dashboard)/classrooms/_actions/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteClassroomButtonProps {
  classroomId: string;
}

export default function DeleteClassroomButton(
  props: DeleteClassroomButtonProps,
) {
  const router = useRouter();
  async function handleDeleteClassroom() {
    try {
      const response = await deleteClassroom(props.classroomId);
      if (response.success) {
        toast.success("Classroom deleted successfully");
        router.push("/classrooms");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return <button onClick={handleDeleteClassroom}>DeleteClassroomButton</button>;
}
