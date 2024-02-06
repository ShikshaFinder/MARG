import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Card,
  CardBody,
  Select,
  Button,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../supabase";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context";

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


function uploadDemolecture() {
  const { register, handleSubmit } = useForm();
   const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext() as { user: UserType };

  const handleSubmitt = () => {
    toast({
      title: "Form submitted!",
      description: "Thank you for your Form",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    Router.push("/uploadmore");
  };

  const onSubmit = async (data: any) => {
    const { error } = await supabase
      .from("schoolDemo")
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



  return (
    <>
      {/* //form to upload demo lecture
    //taking the subject/other, standard/other, Language, Teacher name, experience /experies, discription/more anout the teacher or extra curricular activiteies
//
    //video uploading frontend */}
      <Stack spacing="4">
        <Card variant="outline">
          <CardBody>
            <Text fontSize="4xl">
              Let's provide the quality of education 🚀
            </Text>
            <FormControl isRequired>
              <FormLabel>Teacher Name</FormLabel>
              <Input
                {...register("Teachername", {
                  required: true,
                })}
                name="Teachername"
                placeholder="Teachername"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Standard</FormLabel>
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
              <FormLabel>Subject</FormLabel>
              <Select
                {...register("subject", { required: true })}
                name="subject"
                placeholder="Select option"
              >
                <option value="option1">Maths</option>
                <option value="option2">English</option>
                <option value="option3">Science</option>
              </Select>
              <Input
                {...register("subject", { required: true })}
                name="subject"
                placeholder="Enter another value you want to display as"
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

export default uploadDemolecture;
