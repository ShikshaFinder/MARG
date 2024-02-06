import React from "react";
import Card from "../components/card";
import { Stack, Button, Center } from "@chakra-ui/react";
import Link from "next/link";

function uploadmore() {
  return (
    <>
      <Stack>
        <Card
          icon={
            "https://images.unsplash.com/photo-1497561813398-8fcc7a37b567?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          skillname="You have successfully uploaded the demo lecture "
        />
        <Link href="/uploadDemolecture">
          {" "}
          <Center>
            {" "}
            <Button>Upload more</Button>
          </Center>
        </Link>
      </Stack>
    </>
  );
}

export default uploadmore;
