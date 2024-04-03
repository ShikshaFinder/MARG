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
import { useRouter } from "next/router";
import supabase from "../../supabase";

function Profile() {
  const router = useRouter();
  // const user = useAuthContext();
const  {user} = useAuthContext();
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];
    
    if (!user.email) {
      return (
        <div>
          loading/no user found ,if it is taking longer than usual ,please{" "}
          <a href="/signup">signup</a> <a href="/login">signin</a>.
        </div>
      );
    }

    const [userData, setUserData] = useState<any>();

    if (!user.email) {
      return (
        <div>
          loading/no user found ,if it is taking longer than usual ,please
          signup/signin .
        </div>
      );
    }

    async function getStudent() {
      try {
        let { data, error } = await supabase
          .from("School")
          .select("*")
          // .eq("schoolname",);

        setUserData(data);
      } catch (error) {
        router.push("/form");
      }
    }

    useEffect(() => {
      getStudent();
    }, [user]);
    // console.log(user.id);
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
