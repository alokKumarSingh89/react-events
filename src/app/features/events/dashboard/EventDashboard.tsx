import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Event } from "../../../types/event";
import { actions } from "../eventSlice";

export default function EventDashboard() {
  const { data: events } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const q = query(collection(db, "events"));
    const unsbscribe = onSnapshot(q, {
      next: (querySnapshot) => {
        const evts: Event[] = [];
        querySnapshot.forEach((doc) => {
          evts.push({ id: doc.id, ...doc.data() } as Event);
        });
        dispatch(actions.success(evts));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("complete");
      },
    });
    () => unsbscribe();
  }, [dispatch]);
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
