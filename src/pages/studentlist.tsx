import React, { use } from "react";
import StudentCard from "@/components/studentCard";
import supabase from "../../supabase";
import { useAuthContext } from "@/context";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import {useUser} from "../../store";

function studentlist() {
  const [userData, setUserData] = useState<any[] | null>(null);
  const useUse = useUser().user;
  // console.log();

  async function getSchool() {
    try {
      let { data, error } = await supabase
        .from("admissionform")
        .select("*")
        .eq("instituteid", useUse && useUse?.user_id);

      if (error) throw error;
      setUserData(data);
      console.log(data, error);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    getSchool();
  }, [useUse && useUse?.user_id]);

  return (
    <>
      <Text fontSize="5xl">Admission forms</Text>
      <br />

      {userData &&
        userData.map(
          (admissionform: {
            name: string;
            standard: string;
            mobile: string;
            email: string;
            stream: string;
            percentage: string;
            medium: string;
            Board: string;
          }) => <StudentCard name={admissionform.name} standard={admissionform.standard} board={admissionform.Board} medium={admissionform.medium} email={admissionform.email} stream={admissionform.stream} mobile={admissionform.mobile} percentage={admissionform.percentage} />
        )}
    </>
  );
}

export default studentlist;
