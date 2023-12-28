"use client";
import Imgg from "../components/Imgg";
import Video from "../components/Vid";
import { useState, useEffect } from "react";
import supabase from "../../supabase";

import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";

import { useAuthContext } from "@/context";

import { useToast } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
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
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};
type ChildDataType = {
  scName: string;
  email: string;
  DISE: string;
  State: string;
  street_address: string;
  city: string;
  mobile: string;
  zip: string;
  website: string; // Assuming website is a property
  scDsc: string;
  imgselectedFile: any;
};
const Form1: React.FC<{
  getDataSetter: React.Dispatch<React.SetStateAction<any>>;
}> = ({ getDataSetter }) => {
  let [FullData, setFullData] = useState({
    scName: "",
    email: "",
    DISE: "",
  });
  useEffect(() => {
    getDataSetter((prevalue: any) => {
      return {
        ...prevalue,
        ...FullData,
      };
    });
  }, [FullData, getDataSetter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    setFullData((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };
  // const[scName,setscName]=useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
       Platform registartion
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="SchoolName" fontWeight={"normal"}>
            Name of school
          </FormLabel>
          <Input
            id="SchoolName"
            value={FullData.scName}
            onChange={handleChange}
            placeholder="SchoolName"
            name="scName"
          />
        </FormControl>
      </Flex>
      <FormControl mt="2%">
        <FormLabel htmlFor="email" fontWeight={"normal"}>
          Email address
        </FormLabel>
        <Input
          id="email"
          value={FullData.email}
          onChange={handleChange}
          name="email"
          type="email"
        />
        <FormHelperText>We&apos;ll never share your email.</FormHelperText>
      </FormControl>
      <br />
      <FormControl>
        <FormLabel htmlFor="Image" fontWeight={"normal"}>
          Add the <b>Cover image</b> of your School which you want to show your
          students
        </FormLabel>
        <Imgg getDataSetter={setFullData} />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password" fontWeight={"normal"} mt="2%">
          DISE Code
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter DISE Code"
            value={FullData.DISE}
            name="DISE"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Form2: React.FC<{
  getDataSetter: React.Dispatch<React.SetStateAction<any>>;
}> = ({ getDataSetter }) => {
  let [FullData, setFullData] = useState({
    State: "",
    street_address: "",
    city: "",
    mobile: "",
    zip: "",
  });

  useEffect(() => {
    getDataSetter((prevalue: any) => {
      return {
        ...prevalue,
        ...FullData,
      };
    });
  }, [FullData, getDataSetter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    setFullData((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        School Details
      </Heading>
      <FormControl mr="5%">
        <FormLabel htmlFor="State" fontWeight={"normal"}>
          Subdistrict
        </FormLabel>
        <Input
          id="State"
          value={FullData.State}
          onChange={handleChange}
          name="State"
          placeholder="State"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="street_address"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Street address
        </FormLabel>
        <Input
          type="text"
          id="street_address"
          autoComplete="street-address"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          value={FullData.street_address}
          onChange={handleChange}
          name="street_address"
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 6, null, 2]}>
        <FormLabel
          htmlFor="city"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          City
        </FormLabel>
        <Input
          type="text"
          name="city"
          id="city"
          autoComplete="city"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          value={FullData.city}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="state"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Mobile Number
        </FormLabel>
        <InputGroup>
          <InputLeftAddon children="+91" />
          <Input
            type="tel"
            placeholder="phone number"
            value={FullData.mobile}
            onChange={handleChange}
            name="mobile"
          />
        </InputGroup>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3, null, 2]}>
        <FormLabel
          htmlFor="postal_code"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          ZIP / Postal
        </FormLabel>
        <Input
          type="text"
          name="zip"
          id="postal_code"
          autoComplete="postal-code"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          value={FullData.zip}
          onChange={handleChange}
        />
      </FormControl>
    </>
  );
};

const Form3: React.FC<{
  getDataSetter: React.Dispatch<React.SetStateAction<any>>;
}> = ({ getDataSetter }) => {
  let [FullData, setFullData] = useState({
    website: "",
    scDsc: "",
  });

  useEffect(() => {
    getDataSetter((prevalue: any) => {
      return {
        ...prevalue,
        ...FullData,
      };
    });
  }, [FullData, getDataSetter]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = event.target.value;
    let name = event.target.name;
    console.log(value);
    setFullData((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Social Handles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl as={GridItem} colSpan={[3, 2]}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Website
          </FormLabel>
          <InputGroup size="sm">
            <InputLeftAddon
              bg="gray.50"
              _dark={{
                bg: "gray.800",
              }}
              color="gray.500"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="brand.400"
              rounded="md"
              value={FullData.website}
              onChange={handleChange}
              name="website"
            />
          </InputGroup>
        </FormControl>

        <FormControl id="email" mt={1}>
          <FormLabel
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Discription of School
          </FormLabel>
          <Textarea
            placeholder="Location/Fees/Extra Curricular Activities/Achivments of School"
            rows={3}
            shadow="sm"
            focusBorderColor="brand.400"
            fontSize={{
              sm: "sm",
            }}
            value={FullData.scDsc}
            onChange={handleChange}
            name="scDsc"
          />
          <FormHelperText>
            Please Give as much information as you can so that studnets can max.
            Benefites.
          </FormHelperText>
        </FormControl>
        {/* <br /> */}
        {/* <FormControl>
          <FormLabel htmlFor="Image" fontWeight={"normal"}>
            Add the <b>Introduction Video </b> of your School <small>Campus,extra curricular activities  This video is show cased first</small>
          </FormLabel>
          <Video />
        </FormControl> */}
      </SimpleGrid>

      <br />
      <FormControl>
        <FormLabel htmlFor="Image" fontWeight={"normal"}>
          Add the <b>Introduction Video </b> of your School{" "}
          <small>
            Campus,extra curricular activities This video is showcased first
          </small>
        </FormLabel>
        <Video getDataSetter={setFullData} />
      </FormControl>
    </>
  );
};

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [getChildData, setGetChildData] = useState<ChildDataType | undefined>(
    undefined
  );

  const { user } = useAuthContext() as { user: UserType };

  const submitChildData = async () => {
    console.log(getChildData);

    try {
      const { data, error } = await supabase
        .from("School")
        .insert([
          {
            user_id: user.id,
            schoolname: getChildData?.scName ?? "",
            email: getChildData?.email ?? "",
            DISE: getChildData?.DISE ?? "",
            city: getChildData?.State ?? "",
            streetaddress: getChildData?.street_address ?? "",
            subdistrict: getChildData?.city ?? "",
            mobile1: getChildData?.mobile ?? "",
            zipcode: getChildData?.zip ?? "",
            website: getChildData?.website ?? "",
            discription: getChildData?.scDsc ?? "",
          },
        ])
        .select();

      console.log("data inserted successfully");
      console.log(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  // State: "",
  //   street_address: "",
  //   city: "",
  //   mobile: "",~~
  //   zip: "",
  // website: "",
  //   scDsc: "",
  async function User() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  }

  const handleChildData = async () => {
    console.log(getChildData);

    try {
      const { data, error } = await supabase.storage
        .from("uploads")
        .upload(
          user.id + "/" + uuidv4(),
          getChildData?.imgselectedFile ?? undefined
        );
      console.log(data);
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1 getDataSetter={setGetChildData} />
        ) : step === 2 ? (
          <Form2 getDataSetter={setGetChildData} />
        ) : (
          <Form3 getDataSetter={setGetChildData} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                  handleChildData();
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Account created.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  submitChildData();
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
