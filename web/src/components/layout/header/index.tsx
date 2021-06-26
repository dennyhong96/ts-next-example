import { Flex, Link, Stack, Avatar } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex flexDirection="column">
      <Flex
        justifyContent="space-between"
        backgroundColor="white"
        alignItems="center"
        pt={4}
        pb={4}
        pl={4}
        pr={4}
      >
        <Stack spacing={4} isInline>
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex>
          <Link mr={4}>Account</Link>
          <Avatar size="sm" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
