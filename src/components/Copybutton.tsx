import React from 'react'
import{Button} from "@chakra-ui/react"

function Copybutton() {
     const schoolName = "schoolname"; // Replace with actual school name

     const handleClick = async () => {
       const url = `https://shikshafinder.com/vote/${schoolName}`;
       try {
         await navigator.clipboard.writeText(url);
         console.log("URL copied to clipboard");
       } catch (err) {
         console.error("Failed to copy URL: ", err);
       }
     };
  return (
  <>
  
 

   <Button colorScheme='linkedin'  onClick={handleClick}>Copy URL</Button>
  
  </>
  )
}

export default Copybutton