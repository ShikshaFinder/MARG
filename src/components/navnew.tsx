import React from 'react'
import Link from "next/link";
import{
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  Button
} from "@chakra-ui/react"



function Navnew() {
  return (
    <Menu>
      <MenuButton as={Button} colorScheme="blue">
        Explore 😎
      </MenuButton>
      <MenuList>
        
          <MenuItem>
            {" "}
            <Link href={"/formm"}> Create  platform🚀</Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link href={"/profile"}> My account</Link>
          </MenuItem>
       
        <MenuDivider />
        
          <MenuItem>
            {" "}
            <Link href={"/marketing"}> Market 💪🏻</Link>
          </MenuItem>
          <MenuItem>
            {" "}
            <Link href={"/contest"}>Participate in Contest </Link>
          </MenuItem>
        
      </MenuList>
    </Menu>
  );
}

export default Navnew