import {
  Flex,
  Button,
  Heading,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import SvgClipboardCheck from "@components/icons/ClipboardCheck";

import { useAuth } from "@contexts/auth";

const Header = () => {
  const { logout, user } = useAuth();

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      backgroundColor="white"
      alignItems="center"
      padding={4}
      boxShadow="0 0 5px 0 rgba(0, 0, 0, 0.1)"
    >
      <Stack direction="row" alignItems="center">
        <SvgClipboardCheck style={{ height: "3rem" }} />
        <Heading size="sm">Projects</Heading>
        <Heading size="sm">Users</Heading>
      </Stack>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {user ? user.name || user.email.split("@")[0] : "Profile"}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={logout}>Signout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Header;
