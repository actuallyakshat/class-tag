import Link from "next/link";

interface ClassroomCardProps {
  title: string;
  href: string;
  headerUrl: string;
}

export default function ClassroomCard(props: ClassroomCardProps) {
  return (
    <Link
      href={props.href}
      className="col-span-1 flex cursor-pointer flex-col rounded-lg border shadow-sm"
    >
      <div
        className="h-[100px] w-full rounded-t-lg"
        style={{
          backgroundImage: `url(${props.headerUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="flex flex-col p-4">
        <h2 className="font-black">{props.title}</h2>
      </div>
    </Link>
  );
}
