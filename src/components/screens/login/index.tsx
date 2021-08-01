import React, { useRef, FormEvent, useEffect } from "react";
import NextLink from "next/link";
import {
  Input,
  Stack,
  Box,
  Button,
  useToast,
  Link,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { useAuth } from "@contexts/auth";
import useAsync from "@hooks/useAsync";

const LoginScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const { user, login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return toast({
        title: "Missing credentials.",
        description: "Please enter email and password",
        status: "error",
        isClosable: true,
      });
    }

    try {
      await run(login({ email, password }));
    } catch (err) {
      console.error(err);
      toast({
        title: "Unabled to Login.",
        description: err.message,
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
          max-width: 400px;
          box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          padding: 2rem;
        `}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <Heading size="xl">Login</Heading>

            <FormControl id="email" isRequired>
              <FormLabel>Username</FormLabel>
              <Input ref={emailRef} type="email" placeholder="Email" id="email" />
              <FormHelperText>We&apos;ll never share your email.</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} type="password" placeholder="Password" id="password" />
            </FormControl>
            <Button isLoading={isLoading} colorScheme="teal" type="submit">
              Login
            </Button>
            <NextLink href="/auth/signup" passHref>
              <Link color="teal.500" size="sm">
                Don&apos;t have an account? Signup.
              </Link>
            </NextLink>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginScreen;
