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
  Textarea,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../supabase";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context";

function uploadDemolecture() {
  const { register, handleSubmit } = useForm();
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext() ;

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
            <br />
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
                {...register("Standard", {
                  required: true,
                })}
                name="Standard"
                placeholder="Standard/Main Category of what you are teaching"
              />
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Subject</FormLabel>

              <Input
                {...register("subject", { required: true })}
                name="subject"
                placeholder="Subject/SubCategory"
              />
            </FormControl>
            <br />

            <br />
            <FormControl isRequired>
              <FormLabel>Discription</FormLabel>

              <Textarea
                {...register("discription", { required: true })}
                name="discription"
                placeholder="Input the expertise of teacher or qualifications"
              />
            </FormControl>
            <br />

            <Button>
              {" "}
              <input type="file" accept="video/*" />
            </Button>
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

export default uploadDemolecture;
