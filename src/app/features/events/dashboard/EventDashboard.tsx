import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppSelector } from "../../../store/store";
import { useEffect } from "react";
import { actions } from "../eventSlice";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import LoadingComponent from "../../../layouts/LoadingComponent";

export default function EventDashboard() {
  const { data: events, status } = useAppSelector((state) => state.events);
  const { loadCollection } = useFirestore("events");
  useEffect(() => {
    loadCollection(actions);
  }, [loadCollection]);
  if (status == "loading") <LoadingComponent />;
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
