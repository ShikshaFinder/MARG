import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Congratulations You have successfully submitted your form
      </Heading>
      <Text color={"gray.500"}>
        Please Connect with our Customer Support for Completing the Payment &
        show ads to the most relevant audience.
      </Text>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Button
          colorScheme="teal"
          display={"flex"}
          onClick={() => {
            router.push(
              " https://api.whatsapp.com/send?phone=917984140706&text=Hi%2C%20i%20am%20interested%20in%20shiksha%20finder%27s%20marketing%20services%20and%20i%20want%20to%20complete%20the%20payment"
            );
          }}
        >
          Connect with Customer Support
        </Button>
      </Stack>
    </Box>
  );
}
