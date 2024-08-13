"use client";
import { getUserDetails } from "@/app/(auth)/_actions/actions";
import LoadingScreen from "@/app/_components/LoadingScreen";
import getSession from "@/lib/getSession";
import { User } from "@prisma/client";
import React, { useContext, useEffect, createContext } from "react";

interface GlobalContextProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  async function getSessionHandler() {
    const session = await getSession();
    if (session) {
      setUser(session.user);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    async function getUserDetailsHandler() {
      try {
        const session = await getSession();

        if (!session?.user) return;
        const { id } = session.user;

        if (!id) return;

        const response = await getUserDetails(id);
        if (response.success) {
          console.log(response.data);
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    getUserDetailsHandler();
  }, [isAuthenticated]);

  useEffect(() => {
    getSessionHandler();
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <GlobalContext.Provider
      value={{ isLoading, isAuthenticated, user, setIsAuthenticated, setUser }}
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
