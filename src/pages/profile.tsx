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
import  {useUser}  from "../../store";
import Nouser from "@/components/Nouser";

function Profile() {
  const router = useRouter();
  // const user = useAuthContext();
  const { user } = useAuthContext();
  if (!user.email) {
    return <Nouser />;
  }

    const useUse = useUser((state) => state.user);

    console.log("useUse", useUse);
  const CustomTab = React.forwardRef<HTMLElement, any>((props, ref) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = !!tabProps["aria-selected"];
    const styles = useMultiStyleConfig("Tabs", tabProps);


   
    // console.log(user.id);
  

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
              name={useUse?.schoolname || "Shiksha Finder"}
              email={useUse?.email || "youmail@gmail.com"}
              state={useUse?.State || "Gujarat"}
              Board={useUse?.Board || "GSEB"}
              Medium={useUse?.medium || "English"}
              Standard={useUse?.Standard || "10th"}
              city={useUse?.District || "Ahmedabad"}
              studentnumber={useUse?.studentnumber || 0}
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
