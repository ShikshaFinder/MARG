import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  useToast,
  Box,
  Container,
  SimpleGrid,
  Divider,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  InputGroup,
  InputLeftElement,
  Icon,
  useColorModeValue,
  Stack,
  Select,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaVideo, FaRuler, FaMapPin } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import { state } from "@/components/state";
import supabase from "../../../supabase";

interface State {
  districts: string[];
  state: string;
}

function Form() {
  const toast = useToast();
  const { user } = useAuthContext();
  const form = useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = form;
  const selectedState = watch("State");

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [states] = useState<State[]>(state.states);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    const lat = localStorage.getItem("clickedLat");
    const lng = localStorage.getItem("clickedLng");
    if (lat && lng) {
      setCoords({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, []);

  const districts = states.find((state) => state.state === selectedState)?.districts || [];

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const payload = {
      ...data,
      user_id: user.id,
      latitude: coords?.lat,
      longitude: coords?.lng,
    };

    try {
      const { error } = await supabase.from("information").insert([payload]);

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success!",
          description: "Traffic signal location added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/map");
        }, 2000);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Card
        variant="outline"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        bg={bgColor}
        borderColor={borderColor}
      >
        <CardHeader pb={0}>
          <Heading size="lg" color="teal.600" mb={2}>
            Add New Traffic Signal Location
          </Heading>
          <Text color="gray.500" fontSize="md">
            Please fill in the details to register a new traffic signal in the MARG portal
          </Text>
          <Divider mt={4} />
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              {/* Location Information Section */}
              <Box>
                <Heading size="sm" mb={4} color="teal.500">
                  Location Details
                </Heading>

                <FormControl isRequired mb={4}>
                  <FormLabel fontWeight="medium">Address of traffic signal</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaMapPin} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      {...register("address", { required: true })}
                      placeholder="Enter full address"
                      pl="40px"
                    />
                  </InputGroup>
                </FormControl>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">State</FormLabel>
                    <Select {...register("State", { required: true })} placeholder="Select State">
                      {states.map((stateObj) => (
                        <option key={stateObj.state} value={stateObj.state}>
                          {stateObj.state}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">District/City</FormLabel>
                    <Select
                      {...register("city", { required: true })}
                      placeholder="Select District"
                      isDisabled={!selectedState}
                    >
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Divider />

              {/* Camera Section */}
              <Box>
                <Heading size="sm" mb={4} color="teal.500">
                  Camera Information
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">Camera 1 Link</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaVideo} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        {...register("camera1", { required: true })}
                        placeholder="YouTube or stream link"
                        pl="40px"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">Camera 2 Link</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaVideo} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        {...register("camera2", { required: true })}
                        placeholder="YouTube or stream link"
                        pl="40px"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">Camera 3 Link</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaVideo} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        {...register("camera3", { required: true })}
                        placeholder="YouTube or stream link"
                        pl="40px"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">Camera 4 Link</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaVideo} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        {...register("camera4", { required: true })}
                        placeholder="YouTube or stream link"
                        pl="40px"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>
              </Box>

              <Divider />

              {/* Additional Details */}
              <Box>
                <Heading size="sm" mb={4} color="teal.500">
                  Additional Details
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="medium">Width</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaRuler} color="gray.400" />
                      </InputLeftElement>
                      <Input
                        {...register("width", { required: true })}
                        placeholder="Width in meters"
                        pl="40px"
                        type="number"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isReadOnly>
                    <FormLabel fontWeight="medium">Latitude</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaMapMarkerAlt} color="gray.400" />
                      </InputLeftElement>
                      <Input value={coords?.lat || ""} readOnly pl="40px" />
                    </InputGroup>
                  </FormControl>

                  <FormControl isReadOnly>
                    <FormLabel fontWeight="medium">Longitude</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FaMapMarkerAlt} color="gray.400" />
                      </InputLeftElement>
                      <Input value={coords?.lng || ""} readOnly pl="40px" />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>
              </Box>
            </Stack>

            <Box mt={8} textAlign="right">
              <Button
                colorScheme="teal"
                size="lg"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
                px={8}
                shadow="md"
              >
                Add Traffic Signal
              </Button>
            </Box>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Form;