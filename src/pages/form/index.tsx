import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import supabase from "../../../supabase";
import { useForm, Controller } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import Nouser from "@/components/Nouser";

interface State {
  districts: string[];
  state: string;
}

function Form() {
  const toast = useToast();
  const { user } = useAuthContext();

  const form = useForm();
  const router = useRouter();

  const { register, handleSubmit, control, watch } = form;
  const selectedState = watch("State");

  const handleSubmitt = () => {
    toast({
      title: "Form submitted!",
      description: "Thank you for your Form",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      router.reload();
    }, 2000);
    router.push("/");
  };

  const [states, setStates] = useState<State[]>(state.states);
  const districts =
    states.find((state) => state.state === selectedState)?.districts || [];
  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("Student")
      .insert([{ ...data, user_id: user.id, email: user.email }]);

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
    }
  };
  if (!user.email) {
    return <Nouser />;
  }

  return (
    <>
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <Heading size="md" fontSize="26px">
              We welcome you with full hearts 💓{" "}
            </Heading>
            <br />
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", {
                  required: true,
                })}
                name="name"
                placeholder="Your Name"
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
              <FormLabel> Sub-District</FormLabel>
              <Input
                {...register("subDistrict", { required: true })}
                name="subDistrict"
                placeholder="If its main district than just put City name here also"
              />
            </FormControl>
            <br />{" "}
            <FormControl as="fieldset">
              <FormLabel as="legend">Board</FormLabel>
              <Controller
                name="Board"
                control={control}
                defaultValue="Native"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack spacing="24px">
                      <Radio value="Hindi">CBSE</Radio>
                      <Radio value="English">NCERT</Radio>
                      <Radio value="State">State Board</Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Standard</FormLabel>
              <Select
                {...register("Standard", { required: true })}
                name="Standard"
                placeholder="Standard"
              >
                <option value="Nursery">Nursery</option>
                <option value="1">Standard 1</option>
                <option value="2">Standard 2</option>
                <option value="3">Standard 3</option>
                <option value="4">Standard 4</option>
                <option value="5">Standard 5</option>
                <option value="6">Standard 6</option>
                <option value="7">Standard 7</option>
                <option value="8">Standard 8</option>
                <option value="9">Standard 9</option>
                <option value="10">Standard 10</option>
                <option value="11s">Standard 11 -Science</option>{" "}
                <option value="12s">Standard 12 - Science</option>{" "}
                <option value="11c">Standard 11 - commerce</option>
                <option value="12c">Standard 12 - commerce</option>
                <option value="11a">Standard 11 - Arts</option>
                <option value="12a">Standard 12 - Arts</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>Exam</FormLabel>
              <Input
                {...register("exam", { required: false })}
                name="exam"
                placeholder="exam for which you are preparing"
              />
            </FormControl>
            <FormControl as="fieldset">
              <FormLabel as="legend">Medium</FormLabel>
              <Controller
                name="medium"
                control={control}
                defaultValue="Native"
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <HStack spacing="24px">
                      <Radio value="Hindi">Hindi Medium</Radio>
                      <Radio value="English">English Medium</Radio>
                      <Radio value="Native">Native</Radio>
                    </HStack>
                  </RadioGroup>
                )}
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
