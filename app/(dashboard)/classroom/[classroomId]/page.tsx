import DeleteClassroomButton from "./_components/DeleteClassroomButton";

export default function Classroom({
  params,
}: {
  params: { classroomId: string };
}) {
  console.log(params);
  return (
    <div>
      <p>Classroom {params.classroomId}</p>
      <DeleteClassroomButton classroomId={params.classroomId} />
    </div>
  );
}
