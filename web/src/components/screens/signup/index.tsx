import React, { useRef, FormEvent, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Input, Stack, Box, Text, Button, useToast, Link } from "@chakra-ui/react";

import { useAuth } from "@contexts/auth";

const SignupScreen = () => {
  const toast = useToast();
  const { user, signup } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = emailRef.current?.value;
    const password = emailRef.current?.value;

    if (!email || !password) {
      return toast({
        title: "Missing credentials.",
        description: "Please enter email and password",
        status: "error",
        isClosable: true,
      });
    }

    try {
      await signup({ email, password });
      console.log({ user });
      emailRef.current && (emailRef.current.value = "");
      passwordRef.current && (passwordRef.current.value = "");
    } catch (error) {
      console.error(error);
      toast({
        title: "Unabled to Signup.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      css={`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
      `}
    >
      <Box
        css={`
          width: 100%;
          max-width: 350px;
        `}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <Box>
              <Text as="label" htmlFor="email" fontSize="sm">
                Username
              </Text>
              <Input ref={emailRef} type="email" placeholder="Username" id="email" />
            </Box>
            <Box>
              <Text as="label" htmlFor="password" fontSize="sm">
                Password
              </Text>
              <Input ref={passwordRef} type="password" placeholder="Password" id="password" />
            </Box>
            <Button colorScheme="teal" type="submit">
              Signup
            </Button>
            <NextLink href="/auth/login" passHref>
              <Link color="teal.500" size="sm">
                Have an account? Login.
              </Link>
            </NextLink>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupScreen;
