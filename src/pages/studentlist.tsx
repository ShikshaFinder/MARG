import React, { use } from "react";
import StudentCard from "@/components/studentCard";
import supabase from "../../supabase";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { useUser } from "../../store";
import { Button, Stack } from "@chakra-ui/react";

function studentlist() {
  const [userData, setUserData] = useState<any[] | null>(null);
  const [dataOffset, setDataOffset] = useState(0); // State to keep track of offset

  const handleLoadMore = () => {
    setDataOffset((prevOffset) => prevOffset + 3); // Increment offset by 3
  };
  const useUse = useUser().user;
  // console.log();

  async function getSchool(offset: number) {
    try {
      let { data, error } = await supabase
        .from("admissionform")
        .select("*")
        .eq("instituteid", useUse && useUse?.user_id)
        .range(offset, offset + 3);

      if (error) throw error;

      setUserData((prevData) =>
        prevData ? [...prevData, ...(data || [])] : data || []
      );

      console.log(data, error);
    } catch (error) {
      console.log("Caught Error:", error);
    }
  }

  useEffect(() => {
    if (useUse && useUse.user_id) {
      getSchool(dataOffset);
    }
  }, [useUse, dataOffset]);

  return (
    <>
      <Text fontSize="5xl">Admission forms</Text>
      <br />
      <Stack mx={"auto"}>

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
            }) => (
              <StudentCard
                name={admissionform.name}
                standard={admissionform.standard}
                board={admissionform.Board}
                medium={admissionform.medium}
                email={admissionform.email}
                stream={admissionform.stream}
                mobile={admissionform.mobile}
                percentage={admissionform.percentage}
              />
            )
          )}
      </Stack>

      <Button onClick={handleLoadMore}>Load More</Button>
    </>
  );
}

export default studentlist;
