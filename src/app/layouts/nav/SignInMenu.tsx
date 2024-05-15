import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";

export default function SignInMenu() {
  return (
    <Menu.Item>
      <Image avatar spaced="right" src="./user.png" />
      <Dropdown>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          ></Dropdown.Item>
          <Dropdown.Item text="My Profile" icon="user"></Dropdown.Item>
          <Dropdown.Item text="Sign out" icon="power"></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
