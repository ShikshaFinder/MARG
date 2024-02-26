import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

function Copybutton() {
  const schoolName = "schoolname"; // Replace with actual school name

  const handleClick = async () => {
    let url = `https://shikshafinder.com/vote/${schoolName}`;

    try {
      console.log("URL copied to clipboard");
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(`https://shikshafinder.com/vote/${schoolName}`);
  }, [schoolName]);
  return (
    <>
      <a href={`whatsapp://send?text=${url}`}>
        <Button colorScheme="whatsapp" onClick={handleClick}>
          Share on Whatsapp 📲
        </Button>
        &nbsp;
        <Link href="/aboutcontest">
          <Button colorScheme="gray">Know more</Button>
        </Link>
      </a>
    </>
  );
}

export default Copybutton;
