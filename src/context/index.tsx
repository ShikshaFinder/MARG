// "use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabase";
import { useUser } from "../../store";
import { useRouter } from "next/router";
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
  lastName: string;
  firstName: string;
  updated_at: string;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const setUserStore = useUser((state) => state.setUser);
  const fetcCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // setUser(user);
      
        // if (data == null) {
          router.push("/");
        
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

export const useAuthContext = () =>
  useContext(AuthContext) as {
    id(
      arg0: string,
      id: any
    ): { data: any; error: any } | PromiseLike<{ data: any; error: any }>;
    user: UserType;
  };
