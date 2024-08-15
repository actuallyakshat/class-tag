import { CircleGauge, School, User } from "lucide-react";
import Link from "next/link";

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <CircleGauge className="size-5" />,
  },
  {
    name: "Classrooms",
    href: "/classrooms",
    icon: <School className="size-5" />,
  },
];

const sidebarBottomItems = [
  { name: "Profile", href: "/profile", icon: <User className="size-5" /> },
];

export default function Sidebar() {
  return (
    <aside className="flex min-w-[18rem] max-w-[23rem] flex-1 flex-col justify-between gap-4 border-r">
      <div className="mt-8 flex w-full flex-col">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-muted"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
      <div className="mb-5 flex w-full flex-col">
        {sidebarBottomItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-muted"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </aside>
  );
}
