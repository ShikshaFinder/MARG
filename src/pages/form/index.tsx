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
  Wrap,
  Toast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import supabase from "../../../supabase";
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

    function extractVideoId(url: string, data: any) {
      const prefix = "https://youtu.be/";
      if (url.startsWith(prefix)) {
        const idAndParams = url.slice(prefix.length);
        const [videoId] = idAndParams.split("?");
        return videoId;
      } else {
        Toast({
          title: "Error",
          description: "Invalid URL",
          status: "error",
          duration: 3000,
          isClosable: true,
        }); // Add toast message
      }
    }
    // extractVideoId(data.camera1);

  function handleSubmitt() {
    toast({
      title: "Form submitted!",
      description: "Thank you for your Form",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    router.push("/form/1167");
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
    
    const { error } = await supabase
      .from("information")
      .insert([{ ...data, user_id: user.id }]);

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
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <Heading size="md" fontSize="26px">
              Please Add Address in MARG portal
            </Heading>
            <br />
            <FormControl isRequired>
              <FormLabel>Address of traffic signal</FormLabel>
              <Input
                {...register("address", {
                  required: true,
                })}
                name="address"
                placeholder="address"
              />
            </FormControl>{" "}
            <br />
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Select
                {...register("State", { required: true })}
                name="State"
                placeholder="Select State"
              >
                {states.map((stateObj) => (
                  <option key={stateObj.state} value={stateObj.state}>
                    {stateObj.state}
                  </option>
                ))}
              </Select>
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>District/city</FormLabel>
              <Select
                {...register("city", { required: true })}
                name="city"
                placeholder="Select District"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </FormControl>{" "}
            <br />
            <FormControl isRequired>
              <FormLabel> camera1 Link</FormLabel>
              <Input
                {...register("camera1", { required: true })}
                name="camera1"
                placeholder="Camera 1 Link"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>camera2 Link</FormLabel>
              <Input
                {...register("camera2", { required: true })}
                name="camera2"
                placeholder="camera2 Link"
              />
            </FormControl>
            <br />{" "}
            <FormControl isRequired>
              <FormLabel>camera3 Link</FormLabel>
              <Input
                {...register("camera3", { required: true })}
                name="camera3"
                placeholder="camera3 Link"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>camera4 Link</FormLabel>
              <Input
                {...register("camera4", { required: true })}
                name="camera4"
                placeholder="camera4 Link"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Width</FormLabel>
              <Input
                {...register("width", { required: true })}
                name="width"
                placeholder="width"
              />
            </FormControl>
            <br />
            <Button
              colorScheme="teal"
              size="md"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
}

export default Form;
