import React from "react";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
type Props = {
  setFormOpen: (open: boolean) => void;
};
export default function Navbar({ setFormOpen }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header>
          <img src="./logo.png" alt="logo" />
          Event
        </MenuItem>
        <MenuItem name="Events" />
        <MenuItem>
          <Button
            floated="right"
            positive
            inverted
            content="Create Event"
            onClick={() => setFormOpen(true)}
          ></Button>
        </MenuItem>
        <MenuItem position="right">
          <Button basic inverted content="Login"></Button>
          <Button
            basic
            inverted
            content="Register"
            style={{ marginLeft: "0.5em" }}
          ></Button>
        </MenuItem>
      </Container>
    </Menu>
  );
}
