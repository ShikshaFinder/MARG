import React from 'react'
import Video from "../../../components/videoshowing"
import { Grid, Stack } from "@chakra-ui/react";
import Card2 from "../../../components/card2"
// import { error } from 'console';


function Index() {
  
   async function getVideo() {
   try{
      const socket = new WebSocket(
        "https://bxdwqjsk-8000.inc1.devtunnels.ms/stream"
      );

     console.log("response", socket);
   }catch{
      console.log("error")
   }
    //  console.log("response", response);
     // const data = await response.json();
     // console.log("data", data);
   }
  //  console.log(getVideo());
  //  getVideo();
  return (
    <div>
      <Stack
        // templateColumns={{ base: "repeat(2, 0fr)", lg: "repeat(2, 0fr)" }}
        // gap={1}
        direction={{
          base:"column",
          lg:"row"
        }}
      >
        <Video />
        <Card2/>
      </Stack>
    </div>
  );
}

export default Index