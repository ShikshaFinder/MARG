import { Box, Input, Button } from "@chakra-ui/react";

export const Chatbot = () => {
  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      p={4}
      bg="gray.100"
      borderTopWidth="1px"
      borderColor="gray.400"
    >
      <Box display="flex" alignItems="center">
        <Input placeholder="Type your message..." mr={2} />
        <Button colorScheme="green" size="sm">
          Send
        </Button>
      </Box>
    </Box>
  );
};
