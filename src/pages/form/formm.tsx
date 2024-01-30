"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
interface State {
  name: string;
  districts: string[];
  state: string;
}
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
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";

type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>; 
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};
function formm() {
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext() as { user: UserType };

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
      .from("School")
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

  const [states, setStates] = useState<State[]>([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/state.json");
        const data = await response.json();
        setStates(data.states); // set the fetched data to the 'states' variable
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);


    const districts =
      states.find((state) => state.state === selectedState)?.districts || [];



  return (
    <>
      <>
        <Stack spacing="4">
          <Card variant="outline">
            <CardBody>
              <Heading size="md" fontSize="26px">
    School Registration With Shiksha Finder.              </Heading>
              <br />
              <FormControl isRequired>
                <FormLabel>School Name</FormLabel>
                <Input
                  {...register("schoolname", {
                    required: true,
                  })}
                  name="schoolname"
                  placeholder="schoolname"
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
              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  {...register("location", {
                    required: true,
                  })}
                  name="location"
                  placeholder="Exact address of institute"
                />
                <br />
                <Input
                  {...register("locationlink", {
                    required: true,
                  })}
                  name="locationlink"
                  placeholder="Google map link of school"
                />
              </FormControl>
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
              <FormControl isRequired>
                <FormLabel> Sub-District</FormLabel>
                <Input
                  {...register("subdistrict", { required: true })}
                  name="subdistrict"
                  placeholder="If its main district than just put City name here also"
                />
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel> Mobile Number</FormLabel>
                <Input
                  {...register("mobile1", { required: true })}
                  name="mobile1"
                  type="number"
                  placeholder="Contact number"
                />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel> DISE code</FormLabel>
                <Input
                  {...register("DISE", { required: false })}
                  name="number"
                  type="number"
                  placeholder="DISE code"
                />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel>Standard/Exam </FormLabel>
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
                <br />
                <Input
                  {...register("Standard", { required: false })}
                  name="Standard"
                  placeholder="If Teaching for any exam than mention here"
                />
              </FormControl>
              <br />
              <FormControl as="fieldset">
                <FormLabel as="legend">Board</FormLabel>
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
              <FormControl>
                <FormLabel>email </FormLabel>
                <Input
                  {...register("email", { required: false })}
                  name="email"
                  placeholder="yourschool@...com"
                />
              </FormControl>
              <br />
              <FormControl as="fieldset">
                <FormLabel as="legend">Medium</FormLabel>
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
    </>
  );
}

export default formm;
