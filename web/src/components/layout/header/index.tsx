import { Flex, Button, Heading, Stack } from "@chakra-ui/react";

import { useAuth } from "@contexts/auth";

const Header = () => {
  const { logout } = useAuth();

  return (
    <Flex
      as="header"
      justifyContent="space-between"
      backgroundColor="white"
      alignItems="center"
      padding={4}
    >
      <Stack direction="row">
        <Heading size="sm">Brand</Heading>
        <Heading size="sm">Projects</Heading>
        <Heading size="sm">Users</Heading>
      </Stack>
      <Button onClick={logout}>Signout</Button>
    </Flex>
  );
};

export default Header;
