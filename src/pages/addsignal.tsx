import React from 'react'
import AddCard from "../components/cardAdd"
import Card from "../components/card"   
import { Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import supabase from '../../supabase';
import { Toast } from "@chakra-ui/react"; 

function addsignal() {
      const [userData, setUserData] = useState<any[] | null>(null);

  async function getInfo() {
    try {
      let { data, error } = await supabase
        .from("information")
        .select("address")
       

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
        >        {userData &&
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

export default addsignal