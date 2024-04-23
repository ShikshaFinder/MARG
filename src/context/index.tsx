// "use client";

import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../../supabase";
import { useUser } from "../../store";

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
  user_metadata: any;
  firstName: string;
  updated_at: string;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const setUserStore = useUser((state) => state.setUser);
  const fetcCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
   
          if (
            (user && user.user_metadata.lastName === "School") ||
            (user && user.user_metadata.lastName === "coaching") ||
            (user && user.user_metadata.lastName === "onlineform") ||
            (user && user.user_metadata.lastName === "skillclass")
          ) {
            const { data, error } = await supabase
          .from(user.user_metadata.lastName)
          .select("*")
          .eq("user_id", user.id)
          .single();

        setUserStore(data);
          }
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
