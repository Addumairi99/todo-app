// import React from "react";
import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";

function BtnFilter() {
  const [test, setTest] = useState("All");
  return (
    <Menu>
      <MenuButton
        colorScheme="blue"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        defaultValue={"haha"}
      >
        {test}
      </MenuButton>
      <MenuList>
        {/* <MenuItem onClick={set('All')}>All</MenuItem> */}
        <MenuItem>Complate</MenuItem>
        {/* <MenuItem onClick={set('Incomplate')}>Incomplate</MenuItem> */}
      </MenuList>
    </Menu>
  );
}

export default BtnFilter;
