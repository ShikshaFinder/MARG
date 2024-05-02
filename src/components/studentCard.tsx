import React from "react";
import { Card, Text, CardBody, CardHeader, Stack } from "@chakra-ui/react";

function studentCard({
  name,
  standard,
  mobile,
  email,
  stream,
  percentage,
  medium,
  board,
}: {
  name: string;
  standard: string;
  mobile: string;
  email: string;
  stream: string;
  percentage: string;
  medium: string;
  board: string;
}) {
  return (
    <>
      <Card variant={"elevated"}>
        <CardHeader>
          <Stack direction={"row"}>
            {" "}
            <Text as="b">Name</Text> :<Text>{name} </Text>
          </Stack>
        </CardHeader>
        <CardBody>
          <Stack direction={"column"}>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Standard</Text> :<Text>{standard} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Standard</Text> :<Text>{standard} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Mobile Number</Text> :<Text>{mobile} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Email</Text> :<Text>{email} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Stream</Text> :<Text>{stream} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">percentage</Text> :<Text>{percentage} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Medium</Text> :<Text>{medium} </Text>
            </Stack>
            <Stack direction={"row"}>
              {" "}
              <Text as="b">Board</Text> :<Text>{board} </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
      <br />
    </>
  );
}

export default studentCard;
