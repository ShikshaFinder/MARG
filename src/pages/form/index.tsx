import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";

function form() {
  const router = useRouter();

  async function addInstitution(institute: string) {
    const typeOfInstitute = institute;

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { lastName: typeOfInstitute },
      });
    } catch (error) {
      console.log(error);
    }
    router.push("form/" + institute);
  }

  const { user } = useAuthContext();
  //  console.log(user.lastName)

  return (
    <>
      <Stack spacing={6} direction="column" align="center">
        {" "}
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitution("School")}
        >
          I Have A School 🏫
        </Button>{" "}
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitution("coaching")}
        >
          I Have A Coaching Center 🏢
        </Button>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitution("onlineform")}
        >
          I Have A Online Platform 🌎
        </Button>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitution("skillclass")}
        >
          I Have A Skill Class 🎨
        </Button>
      </Stack>
    </>
  );
}

export default form;
