'use client'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Image,
  Button,
} from "@chakra-ui/react";
// import  from "next/image";


import React from 'react'

function bestschool() {
  return (
    <Accordion>
      <AccordionItem>
        <h2>
          <AccordionButton _expanded={{ bg: "yellow", color: "white" }}>
            <Box as="span" flex="1" textAlign="left">
              <Text as="mark"> DO you have satisfied Students ?</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1590698933947-a202b069a861?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Caffe Latte"
            />

            <Stack>
              <CardBody>
                <Heading size="md">Than you are on a Gold Mine</Heading>

                <Text py="3">
                  According to the Annual Status of Education Report (ASER)
                  2019, which surveyed rural households in India, only around
                  50% of students in the age group of 14-18 years were satisfied
                  with their schools.


                  <b>And if you do have </b>
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant="solid" colorScheme="blue">
                  Buy Latte
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default bestschool