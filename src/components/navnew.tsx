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
            Create platform🚀
          </MenuItem>
        </Link>
        <Link href={"/profile"}>
          <MenuItem>
            My account
          </MenuItem>
        </Link>
        <MenuDivider />
        <Link href={"/marketing"}>
          <MenuItem>
            Market 💪🏻
          </MenuItem>
        </Link>
        <Link href={"/contest"}>
          <MenuItem>
            Participate in Contest
          </MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

export default Navnew