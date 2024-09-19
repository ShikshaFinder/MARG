import React from 'react'
import { Grid } from "@chakra-ui/react";

// {camera1,camera2,camera3,camera4}:{camera1:string,camera2:string,camera3:string,camera4:string}
function Video() {
 
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 0fr)", lg: "repeat(2, 0fr)" }}
      gap={1}
    >
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/_iz0JHeCKy4?si=qzVWkIZnKIB9nxOQ"
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin"
        // allowfullscreen
      ></iframe>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/RzmxEswlVVE?si=axDuFx2HPAz1FagJ"
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin"
        // allowfullscreen
      ></iframe>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/yX4SutFLx48?si=7rJPzCrCUJL1p2Zi"
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin"
        // allowfullscreen
      ></iframe>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/ayBCTIw_BFg?si=yBShzz34gqs-2Fjp"
        title="YouTube video player"
        // frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        // referrerpolicy="strict-origin-when-cross-origin"
        // allowfullscreen
      ></iframe>
    </Grid>
  );
}

export default Video;