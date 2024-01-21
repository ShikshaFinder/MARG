import { Fragment } from "react";
import {
  Container,
  Flex,
  Stack,
  VStack,
  Divider,
  useColorModeValue,
  Avatar,
  Text,
} from "@chakra-ui/react";

interface Notification {
  notification: string;
  School: string;
  userName: string;
  userAvatar: string;
}

const notifications: Notification[] = [
  {
    notification: `Shree Swami Narayan Gurukul `,
    School: "Bhavnagar",
    userName: "Principale Rating",
    userAvatar: "https://bit.ly/dan-abramov",
  },
  {
    notification: `Hetal Jani`,
    School: "Shree swami narayan gurukul",
    userName: "Kent Dodds",
    userAvatar: "https://bit.ly/kent-c-dodds",
  },
  {
    notification: `Naresh Jani`,
    School: "Shihore school",
    userName: "Jena Karlis",
    userAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
  },
];

const NotificationsList = () => {
  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <VStack
        boxShadow={useColorModeValue(
          "2px 6px 8px rgba(160, 174, 192, 0.6)",
          "2px 6px 8px rgba(9, 17, 28, 0.9)"
        )}
        bg={useColorModeValue("gray.100", "gray.800")}
        rounded="md"
        overflow="hidden"
        spacing={0}
      >
        {notifications.map((notification, index) => (
          <Fragment key={index}>
            <Flex
              w="100%"
              justify="space-between"
              alignItems="center"
              _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
            >
              <Stack spacing={0} direction="row" alignItems="center">
                <Flex p={4}>
                  <Avatar
                    size="md"
                    name={notification.userName}
                    src={notification.userAvatar}
                  />
                </Flex>
                <Flex direction="column" p={2}>
                  <Text
                    color={useColorModeValue("black", "white")}
                    fontSize={{ base: "sm", sm: "md", md: "lg" }}
                    dangerouslySetInnerHTML={{
                      __html: notification.notification,
                    }}
                  />
                  <Text
                    color={useColorModeValue("gray.600", "gray.200")}
                    fontSize={{ base: "sm", sm: "md" }}
                  >
                    {notification.School}
                  </Text>
                </Flex>
              </Stack>
            </Flex>
            {notifications.length - 1 !== index && <Divider m={0} />}
          </Fragment>
        ))}
      </VStack>
    </Container>
  );
};

export default NotificationsList;
