import React from "react";
import Link from "next/link";
import { Button, Stack } from "@chakra-ui/react";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";



function form() {

 async function addInstitution(institute: string) {
  const typeOfInstitute = institute;
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: { lastName: typeOfInstitute },
    });
  } catch (error) {
    console.log(error);
  }
}

  const router = useRouter();

const { user } = useAuthContext() ;
 

  return (
    <>
      <Stack spacing={6} direction="column" align="center">
        <Link href={"/form/formm"}>
          {" "}
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => addInstitution("school")}
          >
            I Have A School 🏫
          </Button>
        </Link>
        <Link href={"/form/coachingform"}>
          {" "}
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => addInstitution("coaching class")}
          >
            I Have A Coaching Center 🏢
          </Button>
        </Link>
        <Link href={"/form/onlineform"}>
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => addInstitution("onlinePlatform")}
          >
            I Have A Online Platform 🌎
          </Button>
        </Link>
        <Link href={"/form/skillclass"}>
          <Button
            colorScheme="teal"
            size="md"
            onClick={() => addInstitution("skillClass")}
          >
            I Have A Skill Class 🎨
          </Button>
        </Link>
      </Stack>
    </>
  );
}

export default form;
