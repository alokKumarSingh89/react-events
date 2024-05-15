import React from "react";
import { Button, MenuItem } from "semantic-ui-react";

export default function SignoutButtons() {
  return (
    <MenuItem position="right">
      <Button basic inverted content="Login"></Button>
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      ></Button>
    </MenuItem>
  );
}
