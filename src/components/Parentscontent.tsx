"use client";

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

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
              content="Choose Right to make your future bright,schools,how to find best schools for your child?,what is the best way of marketing your educational platform?,ShikshaFinder"
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
        alt={`Avatar of hetal jani`}
      />
      <Text fontWeight="medium">"hetal jani"</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Parent = () => {
  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1">
        {" "}
        Finding the Right School for Our Little Explorer: A Mom's Guide
      </Heading>
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
              As i am also a mother i can understand..
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            I know how tricky it is to pick the perfect school for our little
            ones. It's like trying to find the best ice cream flavor—everyone
            has a favorite, but what really matters is what makes our kids light
            up. So, let's chat about why picking a school with heart & brain,
            not just fancy words, is so important.
          </Text>
          <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
        </Box>
      </Box>
      <Heading as="h2" marginTop="5">
        How to choose a right school
      </Heading>
      <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
        <Text as="p" fontSize="lg">
          <b>
            {" "}
            Here are some key data points to examine for potential schools:
          </b>
          <br />
          <b> Standardized test scores </b> - How do students at the school
          perform on state tests compared to district and statewide averages?
          Better scores indicate stronger academic programs.
          <br /> <b>Individual student growth </b> - Are students improving
          year-over-year according to standardized test results? Schools that
          support student growth are doing their job.
          <br /> <b>Graduation and college acceptance rates</b> - How many
          students graduate on time and get into college? Higher rates
          demonstrate college preparedness.
          <br /> <b>Teacher qualifications </b>- What percentage of teachers are
          fully certified and have advanced degrees? Well-qualified teachers
          lead to better instruction.
          <br />
          <b> Class sizes</b> - How large are classes? Smaller class sizes allow
          for more individualized attention.
          <br />
          <b> Student demographics</b> - Does the student body reflect the
          diversity of the community? A diverse school provides social-emotional
          benefits. <br />
          <b> Resources and facilities</b> - Does the school offer science labs,
          computers, arts programs, and extracurriculars? Access to resources
          impacts learning.
        </Text>
        <Text as="p" fontSize="lg">
          The most important thing for acadmics and for finding a best school is
          none other than quality of education provided by schools and other
          coaching classes ,not numbers. but i am sure you will definetly ask me
          that ,it is easy to ask that focus upon quality of education but do
          you know how i can measure quality of education??? Till date i did not
          have an answer but i thought that if i can find the answer to this
          questions. That's why i introduced shiksha finder: a platform where
          you can find demo lecture of any platform in including dance class ,
          schools and coaching classes. you can watch the demo lecture with your
          child and than decide where you want to put your child.
        </Text>
        <Text as="p" fontSize="lg">
          So making a great future of a children doesn't always depend upon the
          parents but also schools they both are molders of the future of a
          children. So in Summary <b>Shiksha Finder </b>
          <i>choose right to make you and your children's future bright</i>
        </Text>
      </VStack>
    </Container>
  );
};

export default Parent;
