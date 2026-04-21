"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

import { getCurrentSession, logoutSession } from "@/lib/auth";
import { UserSession } from "@/types";
import { useCart } from "@/hooks/use-cart";

type SessionContextValue = {
  user: UserSession | null;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  clearSession: () => Promise<void>;
  setUser: (user: UserSession | null) => void;
};

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = async () => {
    setIsLoading(true);
    const session = await getCurrentSession();
    setUser(session);
    setIsLoading(false);
  };

  const clearSession = async () => {
    await logoutSession();
    setUser(null);
    useCart.setState({ isSynced: false, serverCartItemIds: {} });
  };

  useEffect(() => {
    refreshSession();
  }, []);

  useEffect(() => {
    if (user) {
      useCart.getState().syncWithServer();
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      refreshSession,
      clearSession,
      setUser,
    }),
    [user, isLoading]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return ctx;
};
