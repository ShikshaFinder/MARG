import React from "react";
import AddCard from "../components/cardAdd";
import Card from "../components/card";
import { Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import supabase from "../../supabase";
import { Toast, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { state } from "@/components/state";



interface State {
  districts: string[];
  state: string;
}

function addsignal() {
  const form = useForm();
  const { register, handleSubmit, control, watch } = form;
  const selectedState = watch("State");
  const [userData, setUserData] = useState<any[] | null>(null);
  
  const [states, setStates] = useState<State[]>(state.states);
  const districts =
  states.find((state) => state.state === selectedState)?.districts || [];
  async function getInfo() {
    try {
      let { data, error } = await supabase
        .from("information")
        .select("address");

      setUserData(data); // Append new data
      // setLoading(false);

      if (error) throw error;
    } catch (error) {
      Toast({
        title: "Error",
        description: "Error fetching data",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={1}
      >
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
      </Grid>
      <br />
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={1}
      >
        {" "}
        {userData &&
          userData.map(
            (
              information: {
                address: string;
              },
              index: number
            ) => <Card key={index} address={information.address} />
          )}
        {/* </Grid> */}
        <AddCard />
      </Grid>
    </>
  );
}

export default addsignal;
