import * as React from "react";
import {
  chakra,
  Container,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  Image,
  Skeleton,
  Box,
  Link,
  Icon,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { GoChevronRight } from "react-icons/go";
import { MdBolt } from "react-icons/md";

const HeroSection = () => {
  return (
      <Container maxW="6xl" px={{ base: 6, md: 3 }} py={24}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={6}
            justifyContent="center"
            maxW="480px"
          >
            <HStack
              as={Link}
              p={1}
              rounded="full"
              fontSize="sm"
              w="max-content"
              bg={useColorModeValue("gray.300", "gray.700")}
            >
              <Box
                py={1}
                px={2}
                lineHeight={1}
                rounded="full"
                color="white"
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
              >
                What's new
              </Box>
              <HStack spacing={1} alignItems="center" justifyContent="center">
                <Link href="/aboutus/new">
                  {" "}
                  <Text lineHeight={1}>See our recent updates</Text>
                </Link>
                <Icon as={GoChevronRight} w={4} h={4} />
              </HStack>
            </HStack>
            <chakra.h1
              fontSize="5xl"
              lineHeight={1}
              fontWeight="bold"
              textAlign="left"
            >
              "Shiksha Finder: Your Partner in Digital Marketing "
              <br />
              <chakra.span color="teal">
                With help of quality of education you provide
              </chakra.span>
            </chakra.h1>
            <Text
              fontSize="1.2rem"
              textAlign="left"
              lineHeight="1.375"
              fontWeight="400"
              color="gray.500"
            >
              <b>At Shiksha Finder</b>, we are dedicated to revolutionizing the
              way students and parents explore educational opportunities. Our
              platform serves as a comprehensive directory for schools and
              coaching classes, offering unparalleled insights and resources to
              facilitate informed decision-making.
              <br />
              <br />
              <b>Our Mission:</b>
              <br />
              Shiksha Finder's mission is to empower students and parents by
              providing transparent and detailed information about educational
              institutions. We aim to simplify the process of finding the right
              school or coaching class, ensuring that every student receives the
              education they deserve.
              <br />
              <br />
              <b>What Sets Us Apart:</b>
              <br />
              Unlike traditional directories, Shiksha Finder goes beyond basic
              listings. We believe in the power of firsthand experience, which
              is why we offer demo lectures for schools and coaching classes.
              These virtual sessions allow users to gain a deeper understanding
              of teaching methodologies, infrastructure, and faculty expertise
              before making a decision.
              <br />
              <br />
              <b>Transparency and Trust:</b>
              <br />
              Transparency is at the core of everything we do. We believe that
              every student and parent deserves access to accurate and reliable
              information when choosing an educational institution. By providing
              comprehensive profiles, unbiased reviews, and demo lectures, we
              strive to build trust and confidence in the decision-making
              process.
              <br />
              <br />
              <b>How We Help:</b>
              <br />
              Whether you're searching for the perfect school for your child or
              seeking additional support through coaching classes, Shiksha
              Finder is here to help. Our platform allows users to explore a
              wide range of educational options, compare features, and connect
              with institutions that align with their needs and preferences.
              <br />
              <br />
              <b>Join Our Community:</b>
              <br />
              Join the Shiksha Finder community today and embark on a journey
              towards educational excellence. Together, we can empower students
              to unlock their full potential and pave the way for a br/ighter
              future.
              <br />
              <br />
              <b>Get in Touch:</b>
              <br />
              Have questions or feedback? We'd love to hear from you! Contact us
              to learn more about how Shiksha Finder can support your
              educational journey.
              <br />
              <br />
              Thank you for choosing Shiksha Finder your trusted partner in
              education.{" "}
            </Text>
            <HStack
              spacing={{ base: 0, sm: 2 }}
              mb={{ base: "3rem !important", sm: 0 }}
              flexWrap="wrap"
            >
              <chakra.button
                w={{ base: "100%", sm: "auto" }}
                h={12}
                px={6}
                color="white"
                rounded="md"
                mb={{ base: 2, sm: 0 }}
                zIndex={5}
                lineHeight={1}
                bgGradient="linear(to-l, #0ea5e9,#2563eb)"
                _hover={{
                  bgGradient: "linear(to-l, #0ea5e9,#2563eb)",
                  opacity: 0.9,
                }}
              >
                <Link href="/skillclass">
                  {" "}
                  <chakra.span> Visit skill classes</chakra.span>
                </Link>
                <Icon as={MdBolt} h={4} w={4} ml={1} />
              </chakra.button>
              <Box
                justifyContent="center"
                bg={useColorModeValue("white", "gray.800")}
                w={{ base: "100%", sm: "auto" }}
                border="1px solid"
                borderColor="gray.300"
                p={3}
                lineHeight={1.18}
                rounded="md"
                boxShadow="md"
                as={Link}
                zIndex={55555555}
                href="/"
              >
                Watch Video
              </Box>
            </HStack>
          </Stack>
          <Box ml={{ base: 0, md: 5 }} pos="relative">
            <DottedBox />
            <Image
              w="100%"
              h="100%"
              minW={{ base: "auto", md: "30rem" }}
              objectFit="cover"
              src={`https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
              rounded="md"
              fallback={<Skeleton />}
            />
          </Box>
        </Stack>
      </Container>
  );
};

function DottedBox() {
  return (
    <Box
      position="absolute"
      left="-45px"
      top="-30px"
      height="full"
      maxW="700px"
      zIndex={-1}
    >
      <svg
        color={useColorModeValue("rgba(55,65,81, 0.1)", "rgba(55,65,81, 0.7)")}
        width="350"
        height="420"
        fill="none"
      >
        <defs>
          <pattern
            id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect x="0" y="0" width="4" height="4" fill="currentColor"></rect>
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
        ></rect>
      </svg>
    </Box>
  );
}

export default HeroSection;
