import React from "react";
import StudentCard from "@/components/studentCard";
import supabase from "../../supabase";
import { useAuthContext } from "@/context";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

function studentlist() {
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
      <Text fontSize="5xl">Admission forms</Text>
      <br />

      {userData &&
        userData.map((admissionform: { name: string }) => (
          <StudentCard text={admissionform.name} />
        ))}
    </>
  );
}

export default studentlist;
