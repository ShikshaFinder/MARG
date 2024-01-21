"use client";
import { Container } from "@chakra-ui/react";
import React from "react";
import {
  Avatar,
  WrapItem,
  Wrap,
  Card,
  CardBody,
  Badge,
} from "@chakra-ui/react";
import {
  FaAlignLeft,
  FaCoins,
  FaEdit,
  FaHeart,
  FaLanguage,
  FaMailBulk,
  FaMailchimp,
  FaMapMarkerAlt,
  FaSchool,
} from "react-icons/fa";
import Link from "next/link";
function profile() {
  return (
    <Container justifyContent={"center"}>
      <Card>
        <CardBody>
          <Wrap justifyContent={"center"} spacing={4} direction="column">
            <WrapItem>
              <Link href={"/formm"}>
                {" "}
                <Avatar size="2xl" name="harsh" borderRadius={"3xl"} />{" "}
                <FaEdit size={24} style={{ alignSelf: "flex-end" }} />
              </Link>
            </WrapItem>
            <WrapItem>
              <big style={{ textAlign: "center" }}>Shree Swami Narayan Gurukul</big>
            </WrapItem>
            <WrapItem>
              <Badge colorScheme="green" borderRadius={"2xl"}>
                Great School
              </Badge>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaMapMarkerAlt />
              <b style={{ textAlign: "center" }}>&nbsp; Ahmedabad, Gujarat</b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaMailBulk />
              <b style={{ textAlign: "center" }}>
                &nbsp;janiharsh794@gmail.com
              </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaCoins />
              <b style={{ textAlign: "center" }}> 30 </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaHeart />
              <b
                color="blue.400"
                style={{
                  textAlign: "center",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                <Link href={"/liked"}> &nbsp; Students List</Link>
              </b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaAlignLeft />

              <b style={{ textAlign: "center" }}>&nbsp; Board</b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaLanguage />

              <b style={{ textAlign: "center" }}>&nbsp; Medium</b>
            </WrapItem>
            <WrapItem style={{ marginTop: "10px" }}>
              <FaSchool />
              <b style={{ textAlign: "center" }}>&nbsp; Standard</b>{" "}
            </WrapItem>
          </Wrap>
        </CardBody>
        {/* Add bg="gray.200" to set the background color */}
      </Card>
    </Container>
  );
}

export default profile;
