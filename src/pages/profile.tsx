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
// import supabase from "../../supabase";
import { useRouter } from "next/router";


function Profile() {
  const router = useRouter();
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];
    const { user } = useAuthContext();
    if (!user) {
      return <div>loading...</div>;
    }


    const [userData, setUserData] = useState<any>();

    if (!user) {
      return <div>loading...</div>;
    }

    // async function getStudent() {
    //   try {
    //     let { data, error } = await supabase
    //       .from("School")
    //       .select("*")
    //       .eq("user_id", user.id);

    //     setUserData(data);
    //   } catch (error) {
    //     router.push("/form");
    //   }
    // }

    // useEffect(() => {
    //   getStudent();
    // }, [user]);
    // console.log(user.id);
    // if (!userData)
    //   return (
    //     <Center>
    //       <Spinner color="green.500" />
    //     </Center>
    //   );

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
