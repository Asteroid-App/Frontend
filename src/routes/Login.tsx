import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
// @ts-ignore-next-line
import { auth } from "../firebase";
import {
  ChakraProvider,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Link as ChakraLink,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <ChakraProvider>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            {/* <Text fontize={'lg'} color={'white.600'}>
			  to enjoy all of our cool <Link color={'blue.400'}>features</Link>
			</Text> */}
          </Stack>
          <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" placeholder="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Stack direction={{ base: "column", sm: "row" }} align={"start"} justify={"space-between"}>
                    <Checkbox>Remember me</Checkbox>
                    <Link to="/Forget">
                      <ChakraLink color={"blue.400"}>Forgot password?</ChakraLink>
                    </Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
              {err && <Box color={"red"}>Something went wrong</Box>}
            </form>
            <Box>
              <p>
                You don't have an account? <Link to="/register">
                <ChakraLink color={"blue.400"}>Register</ChakraLink>
                </Link>
              </p>
            </Box>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};

export default Login;
