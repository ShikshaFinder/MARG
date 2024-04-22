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
  email: any;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>;
  last_sign_in_at: string;
  phone: any;
  role: string;
  user_metadata: Record<string, any>;
  lastName: string;
  firstName: string;
  updated_at: string;
};

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: any) => {
  const setUserStore = useUser((state) => state.setUser);

  const [user, setUser] = useState<UserType | null>(null);
  const fetcCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user as UserType);
      if (user) {
        const { data, error } = await supabase
          .from(user.user_metadata.lastName)
          .select("*")
          .eq("user_id", user.id)
          .single();
        setUserStore(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetcCurrentUser();
  }, [user]);

  // useEffect(() => {
  //   if (
  //     (user && user.user_metadata.lastName === "School") ||
  //     (user && user.user_metadata.lastName === "coaching") ||
  //     (user && user.user_metadata.lastName === "onlineform") ||
  //     (user && user.user_metadata.lastName === "skillclass")
  //   ) {
  //     fetcCurrentUser();
  //   }
  // }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () =>
  useContext(AuthContext) as { user: UserType };
