import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { Heading, Stack, Box, Text, StackDivider } from "@chakra-ui/react";

const StickyComponent = () => {
  const [clientData, setClientData] = useState({
    waitTime: 10, // Initial wait time in seconds
    lane: 1, // Initial lane
  });
  const [isBold, setIsBold] = useState(false); // State to handle bold effect

  useEffect(() => {
    const updateLane = () => {
      setIsBold(true); // Make the text bold when the lane changes

      // Simulate lane and wait time update
      setClientData((prevData) => ({
        waitTime: Math.floor(Math.random() * 15) + 5, // Random next wait time between 5 and 20 seconds
        lane: (prevData.lane % 4) + 1, // Cycle through lanes 1 to 4
      }));

      // Remove bold effect after 2 seconds
      setTimeout(() => {
        setIsBold(false);
      }, 2000);
    };

    // Wait for the current wait time before updating the lane
    const laneChangeTimer = setTimeout(updateLane, clientData.waitTime * 1000);

    // Cleanup the timeout on component unmount
    return () => clearTimeout(laneChangeTimer);
  }, [clientData]); // Depend on clientData so it runs after each update

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Traffic Report</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Seconds (Wait Time)
            </Heading>
            <Text pt="2" fontSize="sm">
              {clientData.waitTime} seconds
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Lane Prediction
            </Heading>
            <Text
              pt="2"
              fontSize="sm"
              fontWeight={isBold ? "bold" : "normal"} // Bold if isBold is true
            >
              Lane {clientData.lane}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default StickyComponent;
