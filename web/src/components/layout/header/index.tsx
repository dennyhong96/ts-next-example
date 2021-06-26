import { Flex, Button, Heading } from "@chakra-ui/react";

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
      <Heading size="md">Brand</Heading>
      <Button onClick={logout}>Signout</Button>
    </Flex>
  );
};

export default Header;
