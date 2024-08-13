import React from "react";
import { logoutUser } from "../(auth)/_actions/actions";
import { useGlobalContext } from "@/context/globalContext";

export default function LogoutButton() {
  const { setIsAuthenticated, setUser } = useGlobalContext();
  return (
    <form
      action={async () => {
        await logoutUser();
        setIsAuthenticated(false);
        setUser(null);
      }}
    >
      <button className="text-sm font-medium hover:underline">Logout</button>
    </form>
  );
}
