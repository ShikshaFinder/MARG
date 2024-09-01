import React from "react";
import AddCard from "../components/cardAdd";
import Card from "../components/card";
import { Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import supabase from "../../supabase";
import { Toast, FormControl, FormLabel, Select,Button } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { state } from "@/components/state";
  import { FieldValues } from "react-hook-form";


interface State {
  districts: string[];
  state: string;
}

function addsignal() {
  const form = useForm();
  const { register, handleSubmit, control, watch } = form;
  const [loading, setLoading] = useState(false);

  const selectedState = watch("state");
  const selectedDistrict = watch("district");
  const [userData, setUserData] = useState<any[] | null>(null);

  const [states, setStates] = useState<State[]>(state.states);
  const districts =
    states.find((state) => state.state === selectedState)?.districts || [];
  
  async function getInfo(data: FieldValues) {
     setLoading(true);
     try {
       let { data: fetchedData, error } = await supabase
         .from("information")
         .select("address")
         .match({ State: data.state, city: data.district });

       setUserData(fetchedData); // Append new data
       setLoading(false);

       if (error) throw error;
     } catch (error) {
       Toast({
         title: "Error",
         description: "Error fetching data",
         status: "error",
         duration: 9000,
         isClosable: true,
       });
       setLoading(false);
     }
   } // console.log(data.);

  return (
    <>
        <form onSubmit={handleSubmit(getInfo)}>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={1}
      >
          <Select {...register("state")}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.state} value={state.state}>
                {state.state}
              </option>
            ))}
          </Select>

          <Select {...register("district")} disabled={!selectedState}>
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>

          <Button
            type="submit"
            disabled={!selectedState || !selectedDistrict || loading}
            colorScheme="teal"
          >
            Get Info
          </Button>
      </Grid>
        </form>
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
