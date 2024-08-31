import Head from "next/head";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import Info from "../components/info";
import Link from "next/link";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

export default function Home() {
  // const { user } = useAuthContext();
  const LottieAnimation = dynamic(
    () => import("../components/LottieAnimation"),
    {
      ssr: false, // Disable server-side rendering for this component
    }
  );
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <>
      <NextSeo
        title="Traffic Signal Managment Using AI"
        description="Traffic Signal Managment using AI"
        openGraph={{
          url: "https://plus.unsplash.com/premium_photo-1661911626941-2bae2185d92c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpY3xlbnwwfHwwfHx8MA%3D%3D",
          title: "Traffic Signal Managment",
          description: "Home page of Traffic Signal Managment",
          images: [
            {
              url: "https://plus.unsplash.com/premium_photo-1661911626941-2bae2185d92c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpY3xlbnwwfHwwfHx8MA%3D%3D",
              alt: "Traffic",
            },
          ],
          site_name: "Traffic Signal",
          type: "website",
        }}
      />
      <Head>
        <meta name="description" content=" " />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {showAnimation && (
        <div style={{ height: "500px" }} id="lottie-animation">
          <LottieAnimation path="/Animation.json" />
        </div>
      )}
      {!showAnimation && (
        <>
          <Stack minH={"75vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
              <Stack spacing={6} w={"full"} maxW={"lg"}>
                <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                  <Text
                    as={"span"}
                    position={"relative"}
                    _after={{
                      content: "''",
                      width: "full",
                      // height: useBreakpointValue({ base: "20%", md: "30%" }),
                      position: "absolute",
                      bottom: 1,
                      left: 0,
                      bg: "blue.400",
                      zIndex: -1,
                    }}
                  >
                    MARG
                  </Text>
                  <br />{" "}
                  <Text color={"blue.400"} as={"span"}>
                    Traffic Signal Management
                  </Text>{" "}
                </Heading>
                <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
                  We use object detection to manage traffic signals,to reduce
                  the traffic congestion and to save the time of the people.
                </Text>
                <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                  <Link href="/signup">
                    <Button
                      rounded={"full"}
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Get Started
                    </Button>
                  </Link>
                  {/* <Button rounded={"full"}>How It Works</Button> */}
                </Stack>
              </Stack>
            </Flex>
            <Flex flex={1}>
              <Image
                alt={"Login Image"}
                objectFit={"cover"}
                src={"/marg2.png"}
              />
            </Flex>
          </Stack>
          <Info />
        </>
      )}
    </>
  );
}
