import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../supabase";
import Nouser from "@/components/Nouser";
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
import { BlobServiceClient } from "@azure/storage-blob";

//we can have index of news paper and we can have the price of the news paper and we can have the price of the news paper in diffrent states and diffrent districts
//this is the page where we will take the information regarding the target audience of the user
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
  const [states, setStates] = useState<State[]>(state.states);
  const [Image, setImage] = useState<any>(null);

  if (!user.email) {
    return (
     <Nouser/>  
    );
  }

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
      toast({
        title: "Error",
        description: "Image not uploaded",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const { error } = await supabase
      .from("marketingDetails")
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
            <FormControl isRequired>
              <FormLabel>Upload cover Image</FormLabel>
              <Input type="file" accept="image/*" onChange={handleImage} />
            </FormControl>{" "}
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
