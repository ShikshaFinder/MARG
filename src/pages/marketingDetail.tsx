import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../supabase";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Checkbox,
  Stack,
  HStack,
  Card,
  CardBody,
  CheckboxGroup,
  Select,
  useToast,
} from "@chakra-ui/react";
import { state } from "@/components/state";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context";
interface State {
  districts: string[];
  state: string;
}
//the objective of making this page is that we want to price them according to district and 
//state and here we will take information regarding the target audience ,i.e the students they are targeting,state ,district and standard wise.
//but the problem is it is going to be a lot more variable in the first case so we have to make sure we can do it correctly
//if we want to distribute price according to category and district than there is a lot more calculation which will happen ,we can initially do it in manual way but then it will need some kind of automation
//we can price them in diffrent plan in diffrent way,i.e we will sayv in 499 plan per view you will be charged x amount of money,if you want to go for 999 plan than you will be charged y amount of money


function marketingDetail() {
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext();

  const form = useForm();

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
    Router.push("/contest");
  };

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("coaching")
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
    }
  };
  const [states, setStates] = useState<State[]>(state.states);

  const districts =
    states.find((state) => state.state === selectedState)?.districts || [];

  return (
    <>
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <Heading size="md" fontSize="26px">
              Let's promote the quality of education 🚀
            </Heading>
            <br />
            <FormControl isRequired>
              <FormLabel>Name Of Coaching</FormLabel>
              <Input
                {...register("coachingname", {
                  required: true,
                })}
                name="coachingname"
                placeholder="coaching name"
                type="text"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Discription</FormLabel>
              <Input
                {...register("discription", {
                  required: true,
                })}
                name="discription"
                placeholder="Facilities,Fees,etc"
              />
            </FormControl>
            <br />
            <FormLabel>Location</FormLabel>
            <Input
              {...register("location", {
                required: true,
              })}
              name="location"
              placeholder="Exact address of institute"
            />
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
                {...register("District", { required: true })}
                name="District"
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

export default marketingDetail;
