import RedirectToLogin from "@/components/utility/RedirectToLogin";
import getSession from "@/lib/getSession";

export default async function Dashboard() {
  const session = await getSession();
  if (!session) return <RedirectToLogin />;

  console.log("NEW SESSION", session);
  return <div className="w-full">Dashboard for {session?.user?.role}</div>;
}
