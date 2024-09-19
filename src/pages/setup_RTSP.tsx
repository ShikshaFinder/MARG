import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  HStack,
  Radio,
  Heading,
  Button,
  useToast,
  CardBody,
  Card,
  Stack,
  Select,
  Toast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import supabase from "../../supabase";
import {
  Flex,
  Box,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
// import Nouser from "@/components/Nouser";

interface State {
  districts: string[];
  state: string;
}

function Form() {
  const toast = useToast();
  const { user } = useAuthContext();
  const form = useForm();
  const router = useRouter();

  const { register, handleSubmit, watch } = form;
  const selectedState = watch("State");

  // extractVideoId(data.camera1);

  function handleSubmitt() {
    toast({
      title: "Form submitted!",
      description: "Thank you for your Form",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    router.push("/addsignal");
  }

  function Reload() {
    setTimeout(() => {
      router.reload();
    }, 2000);
  }

  const [states, setStates] = useState<State[]>(state.states);
  const districts =
    states.find((state) => state.state === selectedState)?.districts || [];

  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("rtsp").insert([{ ...data }]);

    if (error) {
      console.error("Error submitting Form:", error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      handleSubmitt();
      Reload();
    }
  };
  //   if (!user.email) {
  //     return <Nouser />;
  //   }

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>
              Set up RTSP Protocol ID & Password
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>RTSP Camera User Name</FormLabel>
                <Input
                  {...register("username", { required: true })}
                  name="username"
                  placeholder="username"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel> Password For RTSP</FormLabel>
                <Input
                  {...register("password", { required: true })}
                  name="password"
                  placeholder="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  onClick={handleSubmit(onSubmit)}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Set Up RTSP Protocol
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Form;
