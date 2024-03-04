import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../supabase";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Card,
  CardBody,
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
import { Checkbox, CheckboxGroup, HStack, Input } from "@chakra-ui/react";
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
    Router.push("/analytics");
  };

  if(!user){
    return (<div>
    loading/no user found ,if it is taking longer than usual ,please{" "}
    <a href="signup">signup</a>__ /__<a href="/signin">signin</a>.
  </div>)
  }
  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("marketingDetails")
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
              <FormLabel>State</FormLabel>
              <Select
                {...register("State", { required: true })}
                name="State"
                placeholder="Select state of your target audience"
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
                placeholder="Select District of your target audience"
              >
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </FormControl>{" "}
            <br />
            <br />
            <FormControl isRequired>
              <FormLabel>Standards of your target audience</FormLabel>
              <Controller
                name="Standard"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                  <CheckboxGroup {...field}>
                    <HStack spacing="24px" wrap="wrap">
                      <Checkbox value="Kg">Kinder Garden</Checkbox>
                      <Checkbox value="ten">1-10</Checkbox>
                      <Checkbox value="science">11-12 Science</Checkbox>
                      <Checkbox value="Commerce">11-12 Commerce</Checkbox>
                      <Checkbox value="Arts">11-12 Arts</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                )}
              />
            </FormControl>
            <br />
            <br />
            <FormControl as="fieldset">
              <FormLabel as="legend">
                Board in which your target audience studies
              </FormLabel>
              <Controller
                name="Board"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                  <CheckboxGroup {...field}>
                    <HStack spacing="24px" wrap="wrap">
                      {" "}
                      <Checkbox value="CBSE">CBSE</Checkbox>
                      <Checkbox value="ICSE">ICSE</Checkbox>
                      <Checkbox value="IB">IB</Checkbox>
                      <Checkbox value="AISSCE">AISSCE</Checkbox>
                      <Checkbox value="NIOS">NIOS</Checkbox>
                      <Checkbox value="State">State Board</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                )}
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel> examinations your target audience see</FormLabel>
              <Input
                {...register("exam", { required: false })}
                name="exam"
                placeholder="JEE,NEET,etc"
              />
            </FormControl>
            <br />
            <FormControl as="fieldset">
              <FormLabel as="legend">Medium you want to target</FormLabel>
              <Controller
                name="medium"
                control={control}
                defaultValue={[]}
                rules={{ required: true }}
                render={({ field }) => (
                  <CheckboxGroup {...field}>
                    <HStack spacing="24px">
                      <Checkbox value="Hindi">Hindi Medium</Checkbox>
                      <Checkbox value="English">English Medium</Checkbox>
                      <Checkbox value="Native">Native</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                )}
              />
            </FormControl>
            <br />
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
