"use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabase";

type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>;
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const fetcCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.log(error);
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

export const useAuthContext = () => useContext(AuthContext) as { user: UserType };
