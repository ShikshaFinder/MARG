"use client";

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SocialProfileWithImage() {
  return (
    <Center py={6}>
      <Box
        maxW={"270px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit="cover"
          alt="#"
        />
      

       
         
      </Box>
    </Center>
  );
}
