"use client";
import { getUserDetails, logoutUser } from "@/app/(auth)/_actions/actions";
import LoadingScreen from "@/app/_components/LoadingScreen";
import getSession from "@/lib/getSession";
import { User } from "@prisma/client";
import { Session } from "next-auth";
import React, { useContext, useEffect, createContext } from "react";

interface GlobalContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [session, setSession] = React.useState<Session | null>(null);
  const [user, setUser] = React.useState<User | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    async function getUserDetailsHandler() {
      try {
        setIsLoading(true);
        if (!session?.user) throw new Error("No user session found");

        const { id } = session.user;
        if (!id) throw new Error("No user ID found");

        console.log("Getting user details for ID:", id);
        const response = await getUserDetails(id);
        if (!response.success || !response.data) {
          throw new Error("Error fetching user details or no user found");
        }

        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
        setUser(null);
        setIsAuthenticated(false);
        await logoutUser();
      } finally {
        setIsLoading(false);
      }
    }

    if (session) {
      getUserDetailsHandler();
    } else {
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  }, [session]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        user,
        setIsAuthenticated,
        setUser,
        setSession,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within the GlobalProvider");
  }
  return context;
};

export { GlobalProvider, useGlobalContext };
