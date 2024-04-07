// "use client";
import { Fragment } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  VStack,
  Flex,
  Text,
  Icon,
  Divider,
} from "@chakra-ui/react";
import supabase from "../../supabase";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

const contactOptions = [
  {
    label: "Address",
    value: "7518/gayatrinagar/Bhavanagar/Gujrat",
    icon: GoLocation,
  },
  {
    label: "PHONE NUMBER",
    value: "+91 7984140706",
    icon: BsPhone,
  },
  {
    label: "EMAIL",
    value: "ceo@shikshafinder.com",
    icon: HiOutlineMail,
  },
];

const Contact = () => {
  const form = useForm();
  const toast = useToast();
  const { register, handleSubmit } = form;
  const onSubmit = async (data: any) => {
    const { error } = await supabase.from("contactus").insert([{ ...data }]);
    if (error) {
      console.error("Error submitting feedback:", error);
    } else {
      handleSubmitt();
    }
  };

  const handleSubmitt = () => {
    toast({
      title: "Thank you for your feedback 👍",
      description: "Your feedback is important to us. We will get back to you soon.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <Container maxW="7xl" py={10} px={{ base: 5, md: 8 }}>
      <Stack spacing={10}>
        <Flex align="center" justify="center" direction="column">
          <Heading fontSize="4xl" mb={2}>
            Contact Us
          </Heading>
          <Text fontSize="md" textAlign="center">
            We are here to solve every issue you face 😊
          </Text>
        </Flex>
        <Stack
          spacing={{ base: 6, md: 0 }}
          direction={{ base: "column", md: "row" }}
          justify="space-between"
        >
          {contactOptions.map((option, index) => (
            <Fragment key={index}>
              <Stack
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center"
                px={3}
              >
                <Icon as={option.icon} w={10} h={10} color="green.400" />
                <Text fontSize="lg" fontWeight="semibold">
                  {option.label}
                </Text>
                <Text fontSize="md" textAlign="center">
                  {option.value}
                </Text>
              </Stack>
              {contactOptions.length - 1 !== index && (
                <Flex>
                  <Divider orientation="vertical" />
                </Flex>
              )}
            </Fragment>
          ))}
        </Stack>
        <VStack
          as="form"
          spacing={8}
          w="100%"
          bg={useColorModeValue("white", "gray.700")}
          rounded="lg"
          boxShadow="lg"
          p={{ base: 5, sm: 10 }}
        >
          <VStack spacing={4} w="100%">
            <Stack
              w="100%"
              spacing={3}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  {...register("Name", {
                    required: true,
                  })}
                  name="Name"
                  type="text"
                  placeholder="Bahubali"
                  rounded="md"
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  {...register("Email", {
                    required: true,
                  })}
                  name="Email"
                  type="email"
                  placeholder="test@test.com"
                  rounded="md"
                />
              </FormControl>
            </Stack>
            <FormControl id="subject">
              <FormLabel>Subject</FormLabel>
              <Input
                {...register("Subject", {
                  required: true,
                })}
                name="Subject"
                type="text"
                placeholder="Are you available for freelance work?"
                rounded="md"
              />
            </FormControl>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea
                {...register("Message", {
                  required: true,
                })}
                name="Message"
                size="lg"
                placeholder="Enter your message"
                rounded="md"
              />
            </FormControl>
          </VStack>
          <VStack w="100%">
            <Button
              onClick={handleSubmit(onSubmit)}
              bg="green.300"
              color="white"
              _hover={{
                bg: "green.500",
              }}
              rounded="md"
              w={{ base: "100%", md: "max-content" }}
            >
              Send Message
            </Button>
          </VStack>
        </VStack>
      </Stack>
    </Container>
  );
};

export default Contact;
