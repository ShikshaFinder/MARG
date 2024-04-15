import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function Nouser() {
  const Router = useRouter();

  
  return (
    <>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Button
          colorScheme="teal"
          display={"flex"}
          onClick={() => {
            Router.push("/signup");
          }}
        >
          SignUp
        </Button>
        <Button
          colorScheme="teal"
          display={"flex"}
          onClick={() => {
            Router.push("/login");
          }}
        >
          SignIn
        </Button>
      </Stack>
    </>
  );
}

export default Nouser;
