"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
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
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";

function formm() {
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext();

  const form = useForm();

  const { register, handleSubmit, control } = form;

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
   if (!user.email) {
     return (
       <div>
         loading/no user found ,if it is taking longer than usual ,please{" "}
         <a href="signup">signup</a>__ /__<a href="/signin">signin</a>.
       </div>
     );
   }

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("onlineform")
      .insert([{ ...data, user_id: user.id }]);
    if (error) {
      console.error("Error submitting Form:", error);
    } else {
      handleSubmitt();
    }
  };

  return (
    <>
      <>
        <Stack spacing="4">
          <Card variant="outline">
            <CardBody>
              <Heading size="md" fontSize="26px">
                Online Platfrom Registration Shiksha Finder
              </Heading>
              <br />
              <FormControl isRequired>
                <FormLabel>Online Platform Name</FormLabel>
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
                    required: false,
                  })}
                  name="locationlink"
                  placeholder="Google map link of coaching class"
                />
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  {...register("State", {
                    required: true,
                  })}
                  name="State"
                  placeholder="State"
                />
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>App Name</FormLabel>
                <Input
                  {...register("app", { required: false })}
                  name="app"
                  placeholder="App name in playstore"
                />
              </FormControl>
              <br />
              <FormControl>
                <FormLabel> Playstore link</FormLabel>
                <Input
                  {...register("link", { required: false })}
                  name="link"
                  placeholder="link of playstore"
                />
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel> Mobile Number</FormLabel>
                <Input
                  {...register("mobile", { required: true })}
                  name="mobile"
                  type="tel"
                  placeholder="Contact number"
                />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel> website</FormLabel>
                <Input
                  {...register("website", { required: true })}
                  name="website"
                  type="website"
                  placeholder="website"
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
                  {...(register("Standard"), { required: false })}
                  name="Standard"
                  placeholder="If Teaching for any exam than mention here"
                />
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>Board</FormLabel>
                <Input
                  {...register("Board", { required: false })}
                  name="Board"
                  placeholder="Board / If applicable"
                />
              </FormControl>
              <br />
              <FormControl>
                <FormLabel>email </FormLabel>
                <Input
                  {...register("email", { required: false })}
                  name="email"
                  placeholder="yourcoaching@...com"
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
              <FormControl isRequired>
                <FormLabel>Upload cover Image</FormLabel>
                <Input type="file" accept="image/*" />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel>Upload introduction video</FormLabel>
                <Input type="file" accept="video/*" />
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
    </>
  );
}

export default formm;
