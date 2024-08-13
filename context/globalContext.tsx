"use client";
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
    setIsLoading(false);
  }

  useEffect(() => {
    getSessionHandler();
  }, [isAuthenticated]);

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
