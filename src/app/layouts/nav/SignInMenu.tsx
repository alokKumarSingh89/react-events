import React from "react";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { useAppSelector } from "../../store/store";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export default function SignInMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const handleLogout = async () => {
    await signOut(auth);
  };
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={currentUser?.photoURL || "/user.png"} />
      <Dropdown pointing="top left" text={currentUser?.displayName || ""}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/createEvent"
            text="Create Event"
            icon="plus"
          ></Dropdown.Item>
          <Dropdown.Item
            text="My Profile"
            icon="user"
            as={Link}
            to={`/profile/${currentUser?.uid}`}
          ></Dropdown.Item>
          <Dropdown.Item
            text="Sign out"
            icon="power"
            onClick={handleLogout}
          ></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
