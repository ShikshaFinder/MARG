import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Box,
  useTab,
  useMultiStyleConfig,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useAuthContext } from "@/context";
import Profilee from "../components/profile";
import Leaderbord from "../components/Leaderbord";
import supabase from "../../supabase";
import { useRouter } from "next/router";


type UserType = {
  app_metadata: {
    provider: string;
    providers: string[];
  };
  aud: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: Array<any>; // You might want to define a type for this array
  last_sign_in_at: string;
  phone: any;
  role: string;
  updated_at: string;
};

function Profile() {
    const [userData, setUserData] = useState<any>();

    const router = useRouter();
  const { user } = useAuthContext() as { user: UserType };
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];
    const { user } = useAuthContext() as { user: UserType };
    const [userData, setUserData] = useState<any>();

    async function getStudent() {
      try {
        let { data, error } = await supabase
          .from("School")
          .select("*")
          .eq("user_id", user.id);

        setUserData(data);
      } catch (error) {
        router.push("/form");
      }
    }
    
  useEffect(() => {
    getStudent();
  }, [user]);
  console.log(user.id);
 if (!userData)
   return (
     <Center>
       <Spinner color="green.500" />
     </Center>
   );


    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button __css={styles.tab} {...tabProps}>
        <Box as="span" mr="2">
          {isSelected ? "😎" : "😐"}
        </Box>
        {tabProps.children}
      </Button>
    );
  });

  return (
    <>
      <Tabs>
        <TabList>
          <CustomTab>Profile</CustomTab>
          <CustomTab>Leaderbord</CustomTab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {" "}
            <Profilee
              name="harsh"
              email="ceo@shikshafinder.com"
              state="Gujrat"
              Board="CBSE"
              Medium="English"
              Standard="10th"
              city="Ahmedabad"
            />
          </TabPanel>
          <TabPanel>
            <Leaderbord />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default Profile;
