import { useEffect, FC } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { Stack, Button } from "@chakra-ui/react";

import Layout from "@components/layout";
import { useAuth } from "@contexts/auth";
import PageWithLayoutType from "src/types/pageWithLayout";

const Home: FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  return (
    <Stack direction="row">
      <NextLink href="/projects">
        <Button colorScheme="teal">Go to projects</Button>
      </NextLink>
      <Button onClick={logout}>Signout</Button>
    </Stack>
  );
};

(Home as PageWithLayoutType).Layout = Layout;

export default Home;
