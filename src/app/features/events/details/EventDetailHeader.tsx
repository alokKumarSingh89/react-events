import React from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { Event } from "../../../types/event";
const eventImageStyle = {
  filter: "brightness(30%)",
};

const eventImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};
interface IProps {
  event?: Event;
}
export default function EventDetailHeader({ event }: IProps) {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/categoryImages/${event?.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event?.title}
                  style={{ color: "white" }}
                />
                <p>{event?.date}</p>
                <p>
                  Hosted by <strong>{event?.hostedBy}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached="bottom">
        <Button>Cancel My Place</Button>
        <Button color="teal">JOIN THIS EVENT</Button>

        <Button
          color="orange"
          floated="right"
          as={Link}
          to={`/manage/${event?.id}`}
        >
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
}
