import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  VStack,
  Link
} from "@chakra-ui/react";
import Head from "next/head";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  marginTop?: number;
  tags: any[];
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <>
            <meta
              name="ShikshaFinder"
              content="What is the best way to market any educational platform?"
            />
            <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
              {tag}
            </Tag>
          </>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of Harsh Jani`}
      />
      <Text fontWeight="medium">"Harsh Jani"</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Parent = () => {
  return (
    <>
      <Head>
        <title>How To Market your Educational Platform?</title>
        <meta
          name="description"
          content="How To Market your Educational platform in one of the best possible way"
        />
        <meta
          name="keywords"
          content="Schools near me ,things to consider whicle choosing a school,How to reach out to more students,How to market your educational platform,How to find best school for your child?"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="Discription"
          content="How to approach more students for your educational platform "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container maxW={"7xl"} p="12">
        <Heading as="h1"> How to find best school for your child?</Heading>
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%"
            >
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src={
                    "https://images.unsplash.com/photo-1629872430082-93d8912beccf?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                  alt="Student choosing a good school"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <BlogTags tags={["Student", "Education"]} />
            <Heading marginTop="1">
              <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                How to scale your Educational platform in one of the best
                possible way
              </Text>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              remember the days of paper pamphlets and street banners for
              spreading the word about your school, coaching class, or skill
              workshop? Times have changed, folks! Today, the classroom has gone
              online, and so should your student outreach strategy.
            </Text>
            <BlogAuthor
              name="John Doe"
              date={new Date("2021-04-06T19:01:27Z")}
            />
          </Box>
        </Box>
        <Heading as="h2" marginTop="5">
          Hey Educators! How to Reach Students in Today's Digital Duniya ✨
        </Heading>
        <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
          <Text as="p" fontSize="lg">
            <b>
              {" "}
              But hold on, where do you even begin? Don't worry, we've got your
              back! Here's your guide to attracting students in the digital age:{" "}
            </b>
            <br />
            <br />
            <b> 1. Be Present Where They Are:</b> Think Instagram reels, YouTube
            tutorials, Facebook groups – students are hanging out online,
            soaking up content. Create short, engaging videos showcasing your
            teaching style, course highlights, and student testimonials. Make it
            informative and fun, not just a boring lecture clip!
            <Link
              href="https://platform.shikshafinder.com/marketing"
              isExternal
            >
              start marketing your school
              <ExternalLinkIcon mx="2px" />
            </Link>
            <br />
            <Text as="p" fontSize="lg">
              <b>2. Master the Magic of Social Media:</b> Don't just post,
              engage! Start conversations on your Facebook page, answer
              questions on Twitter, and run interactive polls on Instagram. Show
              students you're not just another faceless institution, but a
              community they can be part of.
              <br />
            </Text>
            Engage your students with help of Demo Lectures{" "}
            <Link
              href="   https://platform.shikshafinder.com/marketing"
              isExternal
            >
              Shiksha Finder Lectures <ExternalLinkIcon mx="2px" />
            </Link>
            <br /> <b>Leverage the Power of Shiksha Finder</b>This website is a
            game-changer for educators! Upload your demo lectures for free,
            reaching a wider audience of students actively searching for the
            perfect course. Plus, you can showcase your educational platform and
            attract potential enrolments. Think of it as your online storefront
            attracting curious customers!
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://platform.shikshafinder.com/marketing">
                ShikshaFinder
              </a>
            </Text>
            <br /> <b>Run Targeted Ads: </b>- With shiksha finder, you can run
            targeted ads for perticular student for the class in which they are
            studying, so that you can reach out to the right student at the
            right time.
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://platform.shikshafinder.com/marketing">
                Shiksha Finder Marketing
              </a>
            </Text>
            <br />
            <b>With help of your students get honest reviews</b> You can attract
            more students with more good reviews.
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://platform.shikshafinder.com/marketing">
                Shiksha Finder Marketing
              </a>
            </Text>{" "}
          </Text>

          <Text as="p" fontSize="lg">
            So making your Educational platform a brand with shiksha finder is
            so easy and great.
            <Text
              as="span"
              color="blue"
              textDecoration="underline"
              cursor="pointer"
            >
              <a href="https://platform.shikshafinder.com/contest">
                Get Started
              </a>
            </Text>{" "}
          </Text>
        </VStack>
      </Container>
    </>
  );
};

export default Parent;
