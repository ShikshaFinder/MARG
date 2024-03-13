import React, { useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  Card,
  CardBody,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../supabase";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useAuthContext } from "@/context";

function uploadDemolecture() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm();
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext();
  useEffect(() => {
    // console.log("here", user);

    setTimeout(() => {
    if (!user) {
      // console.log("here in user");
      Router.push("/login");
    } else if (user && !user.lastName) {
      Router.push("/form");
    }
    }, 3000);
  }, [user]);

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
    const videoId = extractVideoId(data.videolink);
    if (videoId) {
      data.videolink = videoId;
    } else {
      toast({
        title: "Error",
        description: "Invalid YouTube video URL",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

     if(!user){
      return
     }

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

  function extractVideoId(url: string) {
    const prefix = "https://youtu.be/";
    if (url.startsWith(prefix)) {
      const idAndParams = url.slice(prefix.length);
      const [videoId] = idAndParams.split("?");
      return videoId;
    } else {
      return null;
    }
  }

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
            <FormControl isRequired>
              <FormLabel>Youtube video link</FormLabel>

              <Input
                {...register("videolink", { required: true })}
                name="videolink"
                placeholder="enter the youtube video link"
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

export default uploadDemolecture;
