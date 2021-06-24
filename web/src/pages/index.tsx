import { useRouter } from "next/router";
import { Box, Button } from "@chakra-ui/react";

import { useAuth } from "@contexts/auth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) router.push("/auth/login");
  }, [user, router]);

  return (
    <Box>
      <Button onClick={logout}>Signout</Button>
    </Box>
  );
}
