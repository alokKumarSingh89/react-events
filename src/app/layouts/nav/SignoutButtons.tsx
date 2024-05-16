import React from "react";
import { Button, MenuItem } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../common/modals/modalSlice";

export default function SignoutButtons() {
  const dispatch = useAppDispatch();
  return (
    <MenuItem position="right">
      <Button
        basic
        inverted
        content="Login"
        onClick={() => dispatch(openModal({ type: "LoginForm" }))}
      ></Button>
      <Button
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      ></Button>
    </MenuItem>
  );
}
