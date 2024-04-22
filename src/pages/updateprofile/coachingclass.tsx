// "use client";
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import { useUser } from "../../../store";

interface State {
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
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import { BlobServiceClient } from "@azure/storage-blob";
import Nouser from "@/components/Nouser";

function CoachingForm() {
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext();
  const form = useForm();
  const { register, handleSubmit, control, watch } = form;
  const [states, setStates] = useState<State[]>(state.states);
  const [Image, setImage] = useState<any>(null);
    const useUse = useUser((state) => state.user);


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
    return <Nouser />;
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
      .from("coaching")
      .update([{ ...data, img: img_url }])
      .eq("user_id", user.id);

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
                Coaching Class Registration Shiksha Finder
              </Heading>
              <br />
              <FormControl isRequired>
                <FormLabel>Coaching Name</FormLabel>
                <Input
                  {...register("coachingname", {
                    required: true,
                  })}
                  name="coachingname"
                  placeholder="coaching name"
                  type="text"
                  defaultValue={useUse?.coachingname || ""}
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
                  defaultValue={useUse?.discription || ""}
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
                  defaultValue={useUse?.location || ""}
                />
                <br />
                <Input
                  {...register("locationlink", {
                    required: false,
                  })}
                  name="locationlink"
                  placeholder="Google map link of coaching class"
                  defaultValue={useUse?.locationlink || ""}
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
              <br />{" "}
              <FormControl isRequired>
                <FormLabel> Sub-District</FormLabel>
                <Input
                  {...register("subdistrict", { required: true })}
                  name="subdistrict"
                  placeholder="If its main district than just put City name here also"
                  defaultValue={useUse?.subdistrict || ""}
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
                  defaultValue={useUse?.mobile || ""}
                />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel> website</FormLabel>
                <Input
                  {...register("website", { required: false })}
                  name="website"
                  type="website"
                  placeholder="website"
                  defaultValue={useUse?.website || ""}
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
                        <Checkbox value="State">State Board</Checkbox>
                        <Checkbox value="IB">IB</Checkbox>
                        <Checkbox value="AISSCE">AISSCE</Checkbox>
                        <Checkbox value="NIOS">NIOS</Checkbox>
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

export default CoachingForm;
