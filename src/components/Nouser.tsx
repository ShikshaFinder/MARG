"use client";
import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Alert, AlertIcon } from "@chakra-ui/react";

function Nouser() {
  const Router = useRouter();

  return (
    <>
      <Alert status="warning">
        <AlertIcon />
        If you have signed up please reload,or it will be done in few seconds.
      </Alert>
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
        <Button
          colorScheme="teal"
          display={"flex"}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          }}
        >
          Reload Page
        </Button>
      </Stack>
    </>
  );
}

export default Nouser;
