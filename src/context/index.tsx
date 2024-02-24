"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabase";
import { AuthUser } from "@supabase/supabase-js";



const AuthContext = createContext<{
  user: AuthUser | undefined;
}>({
  user: undefined,
});


export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<AuthUser | undefined>();
  const fetcCurrentUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
        console.log(error);
      }
    } catch (error) {
      setUser(undefined);
    } finally {
    }
  };

  useEffect(() => {
    fetcCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () =>
  useContext(AuthContext)
