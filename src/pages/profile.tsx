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
import Nouser from "@/components/Nouser";

function Profile() {
  const router = useRouter();
  // const user = useAuthContext();
  const { user } = useAuthContext();
  if (!user.email) {
    return <Nouser />;
  }
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];
    const styles = useMultiStyleConfig("Tabs", tabProps);

    const [userData, setUserData] = useState<any>();

    async function getStudent() {
      try {
        let { data, error } = await supabase.from("School").select("*");
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
