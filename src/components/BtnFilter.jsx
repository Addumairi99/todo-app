// import React from "react";
import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function BtnFilter() {
  // const [test, setTest] = useState("All");
  return (
    <Menu>
      <MenuButton
        colorScheme="blue"
        as={Button}
        rightIcon={<ChevronDownIcon />}
        defaultValue={"haha"}
      >
        All
      </MenuButton>
      <MenuList>
        {/* <MenuItem onClick={set('All')}>All</MenuItem> */}
        <MenuItem>Complate</MenuItem>
        <MenuItem>Iomplate</MenuItem>
        {/* <MenuItem onClick={set('Incomplate')}>Incomplate</MenuItem> */}
      </MenuList>
    </Menu>
  );
}

export default BtnFilter;
