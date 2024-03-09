import React from 'react'
import Profile from "../components/profile"
import { useAuthContext } from "@/context";
import { useEffect, useState } from "react";
import supabase from "../../supabase";



function studentData() {

    const { user } = useAuthContext();
    const [userData, setUserData] = useState<any[] | null>(null);

    async function getSchool() {
      try {
        let { data, error } = await supabase.from("admissionform").select("*");

        if (error) throw error;
        setUserData(data);
        console.log(data, error);
      } catch (error) {
        console.log("Caught Error:", error);
      }
    }

    useEffect(() => {
      getSchool();
    }, [user]);

    

    


    
  return (
    <>
    {userData &&
        userData.map(
          (admissionform: {
            name: string;
            Medium: string;
            Board: string;
            standard:string;
            state:string;
            email:string;
          }) => (
            <Profile
              Board={admissionform.Board}
              Medium={admissionform.Medium}
              Standard={admissionform.standard}
              city={admissionform.state}
              email={admissionform.email}
              name={admissionform.name}
              state={admissionform.state}
            />
          )
        )}


    </>
  )
}

export default studentData