import React from "react";
import AddCard from "../components/cardAdd";
import Card from "../components/card";
import { useState } from "react";
import supabase from "../../supabase";
import { useForm } from "react-hook-form";
import { state } from "@/components/state";
import { FieldValues } from "react-hook-form";
import {
  Box,
  Grid,
  Select,
  Button,
  Heading,
  Text,
  useToast,
  Flex,
  Container,
  FormControl,
  FormLabel,
  Divider,
  useColorModeValue,
  Stack,
  Badge,
  Spinner
} from "@chakra-ui/react";

interface State {
  districts: string[];
  state: string;
}

function AddSignal() {
  const form = useForm();
  const { register, handleSubmit, watch } = form;
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const selectedState = watch("state");
  const selectedDistrict = watch("district");
  const [userData, setUserData] = useState<any[] | null>(null);

  const [states, setStates] = useState<State[]>(state.states);
  const districts =
    states.find((state) => state.state === selectedState)?.districts || [];

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  async function getInfo(data: FieldValues) {
    setLoading(true);
    try {
      let { data: fetchedData, error } = await supabase
        .from("information")
        .select("address")
        .match({ State: data.state, city: data.district });

      setUserData(fetchedData);
      setLoading(false);

      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: "Error fetching data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box
        mb={8}
        p={6}
        bg={bg}
        borderRadius="lg"
        boxShadow="md"
        border="1px"
        borderColor={borderColor}
      >
        <Heading size="lg" mb={4} color="teal.500">Traffic Signal Management</Heading>
        <Text mb={6} color="gray.600">Select a state and district to view existing traffic signals or add a new one.</Text>

        <form onSubmit={handleSubmit(getInfo)}>
          <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Select {...register("state")} placeholder="Select State">
                {states.map((state) => (
                  <option key={state.state} value={state.state}>
                    {state.state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired isDisabled={!selectedState}>
              <FormLabel>District</FormLabel>
              <Select {...register("district")} placeholder="Select District">
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl width={{ base: "full", md: "40%" }} alignSelf="flex-end">
              <Button
                type="submit"
                disabled={!selectedState || !selectedDistrict || loading}
                colorScheme="teal"
                width="full"
                isLoading={loading}
                loadingText="Fetching"
              >
                Search
              </Button>
            </FormControl>
          </Stack>
        </form>
      </Box>

      <Box mt={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="teal.600">
            Traffic Signals
            {userData && <Badge ml={2} colorScheme="teal">{userData.length}</Badge>}
          </Heading>
          {loading && (
            <Flex align="center">
              <Spinner size="sm" mr={2} color="teal.500" />
              <Text fontSize="sm">Loading signals...</Text>
            </Flex>
          )}
        </Flex>
        <Divider mb={6} />

        {userData && userData.length === 0 && (
          <Box p={8} textAlign="center" bg="gray.50" borderRadius="md">
            <Text color="gray.500">No traffic signals found in this location.</Text>
          </Box>
        )}

        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)"
          }}
          gap={6}
        >
          {userData &&
            userData.map(
              (information: { address: string }, index: number) => (
                <Card key={index} address={information.address} />
              )
            )}
          <AddCard />
        </Grid>
      </Box>
    </Container>
  );
}

export default AddSignal;