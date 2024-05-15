import React from "react";
import EventListItem from "./EventListItem";
import { Event } from "../../../types/event";
type TProps = {
  events: Event[];
};
export default function EventList({ events }: TProps) {
  return (
    <>
      {events.map((event) => (
        <EventListItem event={event} key={event.id} />
      ))}
    </>
  );
}
