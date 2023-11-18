import { Button, Input } from "@chakra-ui/react";

export default function ImageInputButton() {
  return (
    <Button>
      <Input
        type="file"
        accept="image/*"
        onChange={(event) => {
          console.log("image uploaded");
        }}
      />
    </Button>
  );
}
