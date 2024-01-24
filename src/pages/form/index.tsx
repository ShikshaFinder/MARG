import React from "react";
import Link from "next/link";
import { Button, Stack } from "@chakra-ui/react";
// import { useRouter } from "next/router";

function form() {

  // const router=useRouter();

  return (
    <>
      <Stack spacing={6} direction="column" align="center">
        <Link href={"/form/formm"}>
          {" "}
          <Button colorScheme="teal" size="md">
            I Have A School 🏫
          </Button>
        </Link>
        <Link href={"/form/coachingform"}>
          {" "}
          <Button colorScheme="teal" size="md">
            I Have A Coaching Center 🏢
          </Button>
        </Link>
        <Link href={"/form/onlineform"}>
          <Button colorScheme="teal" size="md">
            I Have A Online Platform 🌎
          </Button>
        </Link>
        <Link href={"/skillform"}>
          <Button colorScheme="teal" size="md">
            I Have A Skill Class 🎨
          </Button>
        </Link>
      </Stack>
    </>
  );
}

export default form;
