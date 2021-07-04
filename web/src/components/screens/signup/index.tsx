import React, { useRef, FormEvent, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
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

import { useAuth } from "@contexts/auth";
import useAsync from "@hooks/useAsync";

const SignupScreen = () => {
  const router = useRouter();
  const toast = useToast();
  const { user, signup } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmedPassword = confirmPasswordRef.current?.value;

    if (!email || !password || !confirmedPassword) {
      return toast({
        title: "Missing credentials.",
        description: "Please enter email, password, and confirm password.",
        status: "error",
        isClosable: true,
      });
    }

    if (confirmedPassword !== password) {
      if (passwordRef.current) {
        passwordRef.current.value = "";
        passwordRef.current.focus();
      }
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";

      return toast({
        title: "Password not confirmed",
        description: "Please enter the same password twice",
        status: "error",
        isClosable: true,
      });
    }

    try {
      await run(signup({ email, password }));
    } catch (err) {
      console.error(err);
      toast({
        title: "Unabled to Signup.",
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
            <Heading size="xl">Signup</Heading>

            <FormControl id="email" isRequired>
              <FormLabel>Username</FormLabel>
              <Input ref={emailRef} type="email" placeholder="Email" id="email" />
              <FormHelperText>We&apos;ll never share your email.</FormHelperText>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input ref={passwordRef} type="password" placeholder="Password" id="password" />
            </FormControl>

            <FormControl id="confirm-password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm Password"
                id="confirm-password"
              />
            </FormControl>

            <Button isLoading={isLoading} colorScheme="teal" type="submit">
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
