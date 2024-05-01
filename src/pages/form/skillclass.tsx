import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Img, useToast } from "@chakra-ui/react";
import supabase from "../../../supabase";
import { useAuthContext } from "@/context";
import Nouser from "@/components/Nouser";

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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import { BlobServiceClient } from "@azure/storage-blob";

function formm() {
  const Router = useRouter();
  const toast = useToast();
  const { user } = useAuthContext();
  const form = useForm();
  const { register, handleSubmit, control, watch } = form;
  const [states, setStates] = useState<State[]>(state.states);
  const [Image, setImage] = useState<any>(null);

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
      .from("skillclass")
      .insert([{ ...data, user_id: user.id, img: img_url ,email:user.email}]);

    if (error) {
      console.error("Error submitting Form:", error);
      toast({
        title: "Error",
        description: "Error submitting Form",
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
                skillclass Registration With Shiksha Finder.{" "}
              </Heading>
              <br />
              <FormControl isRequired>
                <FormLabel>Type Of Skill</FormLabel>
                <Select
                  {...register("skilltype", { required: true })}
                  name="skilltype"
                  placeholder="SKill Type"
                >
                  <option value="art">Art & Crafts</option>
                  <option value="Business">Business</option>
                  <option value="coding">coding</option>
                  <option value="dance">Dance</option>
                  <option value="designing">Designing</option>
                  <option value="self-defence">self-deffence</option>
                  <option value="singing">singing</option>
                  <option value="sports">sports</option>
                  <option value="photography">Photography</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel>Skillclass Name</FormLabel>
                <Input
                  {...register("skillclassname", {
                    required: true,
                  })}
                  name="skillclassname"
                  placeholder="SkillClass Name"
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
                  placeholder="Google map link of skillclass"
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
                  {...register("mobile", { required: true })}
                  name="mobile"
                  type="number"
                  placeholder="Contact number"
                />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel>Website</FormLabel>
                <Input
                  {...register("website", { required: true })}
                  name="website"
                  placeholder="Website link"
                />{" "}
              </FormControl>
              <br />
              <FormControl isRequired>
                <FormLabel>Upload cover Image</FormLabel>
                <Input type="file" accept="image/*" onChange={handleImage} />
              </FormControl>{" "}
              <br />
              <FormControl isRequired>
                <FormLabel> Introduction Video Youtube Video Link</FormLabel>
                <Input
                  {...register("videolink", { required: true })}
                  name="videolink"
                  placeholder="enter the youtube video link"
                />
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
