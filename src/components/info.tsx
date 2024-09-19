import {
  Box,
  VStack,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react";

interface FeatureProps {
  heading: string;
  text: string;
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};

export default function gridListWithCTA() {
  return (
    <Box as={Container} maxW="7xl" mt={14} p={4}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        <GridItem colSpan={1}>
          <VStack alignItems="flex-start" spacing="20px">
            <chakra.h2 fontSize="3xl" fontWeight="700">
              Monitoring & adjusting roads & green lights
            </chakra.h2>
          </VStack>
        </GridItem>
        <GridItem>
          <Flex>
            <chakra.p>
              We are using AI to monitor and adjust the traffic signals and the
              green lights to make the traffic flow more efficient.
            </chakra.p>
          </Flex>
        </GridItem>
      </Grid>
      <Divider mt={12} mb={12} />
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={{ base: "8", sm: "12", md: "16" }}
      >
        <Feature
          heading={""}
          text={"Short text describing one of you features/service"}
        />
        <Feature
          heading={"Second Feature"}
          text={"Short text describing one of you features/service"}
        />
        <Feature
          heading={"Third Feature"}
          text={"Short text describing one of you features/service"}
        />
        <Feature
          heading={"Fourth Feature"}
          text={"Short text describing one of you features/service"}
        />
      </Grid>
    </Box>
  );
}
