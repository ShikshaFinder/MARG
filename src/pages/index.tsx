import Head from "next/head";
// import { Inter } from "next/font/google";
import Hero from "../components/hero";
import Waitlist from "../components/Waitlist";
import Aboutus from "../components/aboutus";
import supabase from "../../supabase";
import { useUser } from "@supabase/auth-helpers-react";
import { useAuthContext } from "@/context";
// import { useEffect } from "react";

// import Parentscontent from "./components/Parentscontent";
// const inter = Inter({ subsets: ["latin"] });





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
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};
export default function Home() {
 const { user } = useAuthContext() as { user: UserType };
  return (
    <>
      <Head>
        <title>ShikshaFinder</title>
        <meta
          name="ShikshaFinder"
          content="Schools near me,schools,how to find best schools for your child?,what is the best way of marketing your educational platform?,ShikshaFinder,top 10 schools in Gujrat"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div>Current user : {user.email}</div>
      <Hero />
      <Waitlist />
      <Aboutus />
    </>
  );
}

// export async function getStaticProps() {
//   const data = await supabase.from("school").select("*");
//   return {
//     props: { data },
//   };
