import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignoutButtons from "./SignoutButtons";
import { useAppSelector } from "../../store/store";
import SignInMenu from "./SignInMenu";

export default function Navbar() {
  const { authenticated } = useAppSelector((state) => state.auth);
  return (
    <Menu inverted fixed="top">
      <Container>
        <MenuItem header as={NavLink} to="/">
          <img src="/logo.png" alt="logo" />
          Event
        </MenuItem>
        <MenuItem name="Events" as={NavLink} to="/events" />
        <MenuItem as={NavLink} to="/createEvent">
          <Button
            floated="right"
            positive
            inverted
            content="Create Event"
          ></Button>
        </MenuItem>
        {authenticated ? <SignInMenu /> : <SignoutButtons />}
      </Container>
    </Menu>
  );
}
