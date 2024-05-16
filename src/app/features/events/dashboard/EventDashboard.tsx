import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../store/store";

export default function EventDashboard() {
  const events = useAppSelector((state) => state.events.events);
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
