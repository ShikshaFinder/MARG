import Head from "next/head";
import Aboutus from "../components/aboutus";
import { useAuthContext } from "@/context";
import { NextSeo } from "next-seo";
import Link from "next/link";
import Footer from "../components/footer";
import NavNev from "../components/navnew";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconProps,
  Stack,
  Text,
  useColorModeValue,
  AspectRatio,
} from "@chakra-ui/react";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <>
      <NextSeo
        title="vigyasa"
        description="Let's start learning early with vigyasa"
        openGraph={{
          url: "https://www.vigyasa.live/",
          title: "Let's promote Education quality",
          description: "Home page of vigyasa",
          images: [
            {
              url: "",
              alt: "vigyasa == happy students",
            },
          ],
          site_name: "vigyasa.live",
          type: "website",
        }}
      />
      <Head>
        <meta
          name="Vigyasa"
          content="vigyasa,Vigyan + Jigyasa,Let's learn by questioning Curiosity sparks knowledge ignites,Jee Neet Foundation classes,Carrier counselling with jigyasa"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "20%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  zIndex: -1,
                }}
              >
                vigyasa
              </Text>
              <br />
              <link rel="stylesheet" href="/login" />
              <Text as={"span"} color={"blue.400"} fontSize="4xl">
                Curiosity Sparks ,Knowledge ignites
              </Text>
            </Heading>
            <Text>
              Here at vigyasa We belive to teach <b>by inspiring Curiosity</b>{" "}
              in to the brains of students so that they can learn by questioning
              and can ignite their knowledge.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              {user && user.email ? (
                <NavNev />
              ) : (
                <Link href="/signup">
                  <Button
                    rounded={"full"}
                    size={"lg"}
                    fontWeight={"normal"}
                    px={6}
                    colorScheme={"blue"}
                    _hover={{ bg: "blue.500" }}
                  >
                    Get started
                  </Button>
                </Link>
              )}
              <Link href="/aboutus" target="_blank">
                {" "}
                <Button
                  rounded={"full"}
                  size={"lg"}
                  fontWeight={"normal"}
                  px={6}
                >
                  About vigyasa
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"100%"}
              h={"100%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color={useColorModeValue("red.50", "red.400")}
            />
            <Box
              position={"relative"}
              height={"250px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <AspectRatio ratio={14 / 9}>
                <iframe
                  width="600"
                  height="400"
                  src="https://www.youtube.com/embed/Q8PYzXn4HSs?si=LWLz21eFgabVquDp"
                  title="vigyasa video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </AspectRatio>
            </Box>
          </Flex>
        </Stack>
      </Container>
      <Aboutus />
      <Footer />
    </>
  );
}

const Blob = (props: IconProps) => {
  return (
    <Icon
      width={"100"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
