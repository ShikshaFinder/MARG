import { useRouter } from "next/router";
import supabase from "../../supabase";
import { FcGoogle } from "react-icons/fc";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const Signin = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        console.error("[❌] Auth Error:", error);
        toast({
          title: "Login failed",
          description: error?.message || "Unknown error.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      const userId = data.user.id;
      const userEmail = data.user.email;

      console.log("[✅] Logged in:", userEmail, userId);

      // 🟡 Insert or update user in Users table
      const { error: insertError } = await supabase
        .from("Users")
        .upsert(
          {
            id: userId,
            email: userEmail,
            role: "admin", // default role
          },
          { onConflict: ["id"] } // prevent duplicate IDs
        );

      if (insertError) {
        console.error("[❌] Users Upsert Error:", insertError);
        toast({
          title: "Database Error",
          description: "Could not insert or update user info.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      // 🔍 Fetch role
      const { data: roleData, error: fetchError } = await supabase
        .from("Users")
        .select("role")
        .eq("id", userId)
        .single();

      if (fetchError || !roleData) {
        console.error("[❌] Role Fetch Error:", fetchError);
        toast({
          title: "Role Error",
          description: "Could not fetch user role.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      console.log("[✅] User Role:", roleData.role);
      localStorage.setItem("userRole", roleData.role);

      toast({
        title: "Success",
        description: "Signed in successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        router.push("/setup_RTSP");
      }, 1000);
    } catch (err) {
      console.error("[❌] Signin Exception:", err);
      toast({
        title: "Error",
        description: "Something went wrong during sign-in.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign In</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>to enjoy all our cool features ✌️</Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button variant={"ghost"} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button onClick={Signin} size="lg" bg={"blue.400"} color={"white"} _hover={{ bg: "blue.500" }}>
                Sign In
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Not registered yet?{" "}
                <Link href="/signup" style={{ color: "blue.600", textDecoration: "underline" }}>
                  Signup
                </Link>
              </Text>
              <Stack align={"center"}>
                <Link href="/magicLink">
                  <Text color={"blue.500"}>Forgot password?</Text>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
