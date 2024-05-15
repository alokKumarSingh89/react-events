import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="./logo.png"
            alt="logo"
            style={{ marginBottm: 12 }}
          />
          Event
        </Header>
        <Button size="huge" inverted as={Link} to="/events">
          Get Started
          <Icon name="caret right" inverted />
        </Button>
      </Container>
    </Segment>
  );
}
