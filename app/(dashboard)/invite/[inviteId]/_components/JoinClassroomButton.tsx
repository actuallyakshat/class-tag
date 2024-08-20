"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { joinClassroom } from "../_actions/actions";
import { useGlobalContext } from "@/context/globalContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function JoinClassroomButton({
  classroomId,
}: {
  classroomId: string;
}) {
  const { user } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  async function handleJoinClassroom() {
    setLoading(true);
    const response = await joinClassroom(classroomId, user?.studentId!);
    if (response.success) {
      router.push("/classroom/" + classroomId);
      toast.success("Joined classroom successfully");
    } else {
      setLoading(false);
      toast.error(response.error);
    }
    try {
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  }

  return (
    <Button className="mt-6" onClick={handleJoinClassroom} disabled={loading}>
      {loading ? "Joining..." : "Join Classroom"}
    </Button>
  );
}
