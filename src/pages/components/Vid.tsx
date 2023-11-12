import { Button, Input } from "@chakra-ui/react";

export default function ImageInputButton() {
  return (
    <Button>
      <Input
        type="file"
        accept="video/*"
        onChange={(event) => {
          console.log("Video Uploaded");
        }}
      />
    </Button>
  );
}
