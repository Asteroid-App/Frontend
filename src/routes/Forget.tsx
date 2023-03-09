import { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import  {sendPasswordResetEmail} from "firebase/auth";
// @ts-ignore-next-line
import  {auth} from "../firebase";
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
  Text,
} from "@chakra-ui/react";

function ResetPassword() {

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('') as any // bakılacak tekrardan 
    const navigate = useNavigate()

    const handleLogin = (e:any) =>{
        e.preventDefault(); 
        if (!email || !email.includes("@")) {
            setError("Please enter a valid email address.")
            return
        } 
        sendPasswordResetEmail(auth, email).then(() => {
            setMessage("A password reset link has been sent to your email address to reset your password.")
            setTimeout(() => {
                navigate('/login')
            }, 10000)
        }).catch((error) => {
            setError(error.message)
        })
    }
   
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
              <Heading fontSize={"4xl"}>Reset Password</Heading>
            </Stack>
            <Box>
              <form onSubmit={handleLogin}>
                {message && <Text mb="4">{message}</Text>}
                <Stack spacing={4}>
                  <FormControl id="email" isInvalid={error}>
                    <FormLabel>Email Address</FormLabel>
                    <Input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {error && <Text color="red">{error}</Text>}
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    Reset Password
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </ChakraProvider>
    )
  }
  
  export default ResetPassword;
