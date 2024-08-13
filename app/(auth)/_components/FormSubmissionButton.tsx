"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormSubmissionButtonProps {
  label: string;
}

export default function FormSubmissionButton(props: FormSubmissionButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full" disabled={pending}>
      {pending ? "Please Wait..." : props.label}
    </Button>
  );
}
