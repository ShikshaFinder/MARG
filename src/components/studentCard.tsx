import React from "react";
import { Card, Text, CardBody } from "@chakra-ui/react";

function studentCard({text}:{text:string}) {
  return (
    <Card>
      <CardBody>
        <Text>{text}</Text>
      </CardBody>
    </Card>
  );
}

export default studentCard;
