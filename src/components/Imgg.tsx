import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function ImageInputButton() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.files?.[0] || null;

    setSelectedFile(value);
    console.log(value?.name);
  };

  return (
    <Button>
      <Input type="file" accept="image/*" onChange={fileChange} />
    </Button>
  );
}
