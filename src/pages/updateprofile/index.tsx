import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";

function form() {
  const router = useRouter();

  async function addInstitutionn(institute: string) {
  

   
    router.push("updateprofile/" + institute);
  }

  //  console.log(user.lastName)

  return (
    <>
      <Stack spacing={6} direction="column" align="center">
        {" "}
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitutionn("school")}
        >
          Update School Informtion🏫
        </Button>{" "}
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitutionn("coachingclass")}
        >
          Update Coaching Center Informtion🏢
        </Button>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitutionn("onlinePlatform")}
        >
          Update Online Platform Informtion🌎
        </Button>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addInstitutionn("skillclass")}
        >
          Update Skill Class Informtion 🎨
        </Button>
      </Stack>
    </>
  );
}

export default form;
