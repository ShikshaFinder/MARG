import React from 'react'
import Link from "next/link";
import{
  Menu,
  MenuButton,
  MenuList,
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
        <Link href={"/form"}>
          <MenuItem>
           Fill the form
          </MenuItem>
        </Link>
        <Link href={"/aboutus"}>
          <MenuItem>
            about us
          </MenuItem>
        </Link>
        <MenuDivider />
        <Link href={"/contactus"}>
          <MenuItem>
            contact us
          </MenuItem>
        </Link>
      
      </MenuList>
    </Menu>
  );
}

export default Navnew