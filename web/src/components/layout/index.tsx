import { ReactNode } from "react";
import { Stack, Box } from "@chakra-ui/react";

import { useAuth } from "@contexts/auth";

import Header from "./header";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? (
    <Stack height="100%">
      <Header />
      <Box flex="1">{children}</Box>
    </Stack>
  ) : null;
};

export default Layout;
