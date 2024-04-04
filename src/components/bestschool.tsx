"use client";
import {
  Card,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import Copybutton from "../components/Copybutton";
import Whatsapp from "../components/whatsapp";

import React from "react";

function bestschool() {
  return (
    <>
      <Text as="mark"> Do you have satisfied Students ?</Text>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "40%" }}
          height="50vh"
          src="https://images.unsplash.com/photo-1516463859456-ce782449bfe0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">Than you are on a Gold Mine</Heading>

            <Text py="3">
              According to the Annual Status of Education Report (ASER) 2019,
              which surveyed rural households in India, only around 50% of
              students in the age group of 14-18 years were satisfied with their
              schools.
              <br />
              <b>
                Participate in the contest and show the strength you have 💪{" "}
              </b>
            </Text>
          </CardBody>

          <CardFooter>
            <Link href={"/contest"}>
              <Copybutton />
            </Link>
            &nbsp; &nbsp;
            <Whatsapp />
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}

export default bestschool;
