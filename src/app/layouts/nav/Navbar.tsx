import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignoutButtons from "./SignoutButtons";
import { sampleData } from "../../api/SampleData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Navbar() {
  function seedData() {
    sampleData.forEach(async (event) => {
      const { id, ...rest } = event;
      await setDoc(doc(db, "events", id), {
        ...rest,
      });
    });
  }
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
        <Button floated="right" inverted onClick={seedData}>
          Seed
        </Button>
        <SignoutButtons />
      </Container>
    </Menu>
  );
}
