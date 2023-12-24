import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Imgg from "../components/Imgg";

function MarketingForm() {
 let [FullData, setFullData] = useState();
 

  return (
    <>
      <Imgg getDataSetter={setFullData} />
    </>
  );
}

export default MarketingForm;
