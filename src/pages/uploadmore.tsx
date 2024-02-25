"use client";

import { Box, Heading, Text, Button, Center } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import Link from "next/link";
export default function Success() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        You have succesfully uploaded your demo lecture
      </Heading>
      <Text color={"gray.500"}>
        You can add more demo lectures and provide more insights to your
        students about your quality of education.
      </Text>
      <br />
      <Link href="/uploadDemolecture">
        {" "}
        <Center>
          {" "}
          <Button>Upload more</Button>
        </Center>
      </Link>
    </Box>
  );
}
