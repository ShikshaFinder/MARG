import React from "react";
import supabase from "../../supabase";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

function signout() {
  const toast = useToast();
  const router = useRouter();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success.",
        description: "You have been signed out",
        status: "success",
        duration: 3000,
        isClosable: true,
      },
      
      );
      router.push("/login");
    }
  };

  return (
    <div>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Button onClick={handleSignOut} colorScheme="teal">
          Sign Out
        </Button>
      </Stack>
    </div>
  );
}

export default signout;
