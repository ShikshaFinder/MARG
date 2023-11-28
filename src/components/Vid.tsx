import { Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function ImageInputButton({ getDataSetter }) {
  const [vidselectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    // Only way to use a state for a function, because the setter function
    // can take a callback to set the new value
    // getDataSetter(() => () => FullData);
    getDataSetter((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        vidselectedFile,
      };
    });
  }, [vidselectedFile]);

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.files?.[0] || null;

    setSelectedFile(value);
    // x;
    console.log(value?.name);
  };

  return (
    <Button>
      <Input type="file" accept="video/*" onChange={fileChange} />
    </Button>
  );
}
