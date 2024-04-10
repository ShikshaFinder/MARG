import React from 'react'
import { Heading, Highlight } from '@chakra-ui/react'
import Head from 'next/head';

function gwsf() {
  return (
    <>
      <Head>
        <title>GWSF Ventures Pvt Ltd</title>
        <meta
          name="description"
          content="GWSF Ventures Pvt ltd is a company incorporated in march 14,2024. Shiksha Finder is by far the most integral part of our company and GWSF stands for Grow with shiksha finder. our vision is to make an impact on the society. We want to create products and technologies which can solve the problems of businesses as well as of common people."
        />
      </Head>
      <Heading lineHeight="tall">
        <Highlight
          query={["Shiksha Finder", "GWSF Ventures Pvt Ltd","Grow with Shiksha Finder"]}
          styles={{ px: "2", py: "1", rounded: "full", bg: "teal.100" }}
        >
          GWSF Ventures Pvt ltd is a company incorporated in march 14,2024
          Shiksha Finder is by far the most integral part of our company and
          GWSF stands for Grow with Shiksha Finder. our vision is to make an
          impact on the society.We want to create products and technologies
          which can solve the problems of businesses as well as of comman
          peoples .
        </Highlight>
      </Heading>
    </>
  );
}

export default gwsf