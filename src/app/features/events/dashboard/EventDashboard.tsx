import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import EventForm from "../form/EventForm";
import { sampleData } from "../../../api/SampleData";
import { useEffect, useState } from "react";
import { Event } from "../../../types/event";
type Props = {
  forOpen: boolean;
  setFormOpen: (open: boolean) => void;
};
export default function EventDashboard({ forOpen, setFormOpen }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    setEvents(sampleData);
  }, []);
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {forOpen && <EventForm setFormOpen={setFormOpen} />}
      </Grid.Column>
    </Grid>
  );
}
