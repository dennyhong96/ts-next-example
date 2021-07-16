import { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";

import { useAuth } from "@contexts/auth";

import Header from "./header";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  return user ? (
    <Flex direction="column" height="100%" width="100%">
      <Box height={75} flexBasis={75} flexShrink={0} flexGrow={0}>
        <Header />
      </Box>
      <Box height="calc(100% - 75px)" flexBasis="calc(100% - 75px)" flexGrow={0} flexShrink={0}>
        {children}
      </Box>
    </Flex>
  ) : (
    children
  );
};

export default Layout;
