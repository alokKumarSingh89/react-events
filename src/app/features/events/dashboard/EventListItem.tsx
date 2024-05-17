import React from "react";
import {
  Button,
  Icon,
  Item,
  ItemGroup,
  List,
  Segment,
  SegmentGroup,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Attendee, Event } from "../../../types/event";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-toastify";

export default function EventListItem({ event }: { event: Event }) {
  const removeEvent = async () => {
    try {
      await deleteDoc(doc(db, "events", event.id));
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={event.hostPhotoURL || "/user.png"}
            />
            <Item.Content>
              <Item.Header>{event.title}</Item.Header>
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {event.date}
          <Icon name="marker" /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee: Attendee) => (
            <EventListAttendee attendee={attendee} key={attendee.id} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <span>{event.description}</span>
        <Button
          color="red"
          floated="right"
          content="Delete "
          onClick={removeEvent}
        />
        <Button
          color="teal"
          floated="right"
          content="View"
          as={Link}
          to={`/events/${event.id}`}
        />
      </Segment>
    </SegmentGroup>
  );
}
