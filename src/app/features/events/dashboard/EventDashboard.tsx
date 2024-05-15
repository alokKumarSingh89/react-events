import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { sampleData } from "../../../api/SampleData";
import { useEffect, useState } from "react";
import { Event } from "../../../types/event";

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>(sampleData);
  useEffect(() => {
    setEvents(sampleData);
  }, []);
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filter</h2>
      </Grid.Column>
    </Grid>
  );
}
