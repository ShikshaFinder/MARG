"use client";

import {
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { AddIcon } from "@chakra-ui/icons";


export default function CardInfo() {
  return (
    <Center py={6}>
      <Link href={"/form"}>
        {" "}
        <Box
          maxW={"270px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <AddIcon boxSize={100} margin={10}/>
        </Box>
      </Link>
    </Center>
  );
}
