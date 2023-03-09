import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// @ts-ignore-next-line
import { auth, db, storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  ChakraProvider,
  Flex,
  Box,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
          w="full"
          maxH={"xl"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"lg"}
          boxShadow={"lg"}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Register</Heading>
          </Stack>
          <Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="display-name">
                  <FormLabel>Display Name</FormLabel>
                  <Input type="text" placeholder="display name" />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" placeholder="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="password" />
                </FormControl>
                <FormControl id="avatar">
                  <FormLabel>Avatar</FormLabel>
                  <Input type="file" accept="image/*" />
                </FormControl>
                {err && (
                  <Box p={2} bg="red.100" color="red.800" rounded="md">
                    Something went wrong! Please try again.
                  </Box>
                )}
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link to="/">Already have an account?</Link>
                  </Stack>
                  <Button
                    isLoading={loading}
                    type="submit"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Register
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </ChakraProvider>
  );
};
export default Register;
                 

