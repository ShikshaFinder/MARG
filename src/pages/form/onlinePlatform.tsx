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
import { BlobServiceClient } from "@azure/storage-blob";
import { state } from "@/components/state";
interface State {
  districts: string[];
  state: string;
}  
import { useState } from "react";

function formm() {
 const Router = useRouter();
 const toast = useToast();
 const { user } = useAuthContext();
 const form = useForm();
 const { register, handleSubmit, control, watch } = form;
 const [states, setStates] = useState<State[]>(state.states);
 const [Image, setImage] = useState<any>(null);

 const handleSubmitt = () => {
   toast({
     title: "Form submitted!",
     description: "Thank you for your Form",
     status: "success",
     duration: 3000,
     isClosable: true,
   });
   Router.push("/aboutcontest");
 };
 if (!user.email) {
   return (
     <div>
       loading/no user found ,if it is taking longer than usual ,please{" "}
       <a href="signup">signup</a>__ /__<a href="/login">signin</a>.
     </div>
   );
 }

 const uploadImageToBlobStorage = async (file: any) => {
   const accountName = process.env.NEXT_PUBLIC_AZURE_ACCOUNT_NAME;
   const sasUrl = process.env.NEXT_PUBLIC_AZURE_STORAGE_SAS_URL || "";

   const blobServiceClient = BlobServiceClient.fromConnectionString(sasUrl);

   console.log(file);
   const containerName = process.env.NEXT_PUBLIC_AZURE_CONTAINER_NAME || "";
   const containerClient = blobServiceClient.getContainerClient(containerName);
   const blobName = Date.now() + "_" + file.name;
   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
   const uploadBlobResponse = await blockBlobClient.upload(file, file.size);

   const public_url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
   return public_url;
 };

 const onSubmit = async (data: any) => {
   let img_url;
   try {
     img_url = await uploadImageToBlobStorage(Image);
     console.log("public url : ", img_url);
   } catch (error) {
     toast({
       title: "Error",
       description: (error as Error).message,
       status: "error",
       duration: 3000,
       isClosable: true,
     });
     return;
   }
   if (!img_url) {
     console.log("no image found");
     toast({
        title: "Error",
        description: "No image found",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
     return;
   }
   const { error } = await supabase
     .from("onlineform")
     .insert([{ ...data, user_id: user.id, img: img_url }]);

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

 const selectedState = watch("State");

 const districts =
   states.find((state) => state.state === selectedState)?.districts || [];

 const handleImage = (e: any) => {
   const file = e.target.files[0];
   setImage(file);
   console.log(file);
   // console.log(Image);
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
                  placeholder="Online Platform Name"
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
              <FormControl>
                <FormLabel>State</FormLabel>
                <Input
                  {...register("State", {
                    required: false,
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
                <Input type="file" accept="image/*" onChange={handleImage} />
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
