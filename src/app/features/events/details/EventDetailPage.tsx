import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailChat from "./EventDetailChat";
import EventDetailSidebar from "./EventDetailSidebar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { actions } from "../eventSlice";
import { toast } from "react-toastify";

export default function EventDetail() {
  const { id } = useParams();
  const event = useAppSelector((store) =>
    store.events.data.find((evt) => evt.id === id)
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, "events", id), {
      next: (doc) => {
        dispatch(actions.success({ id: doc.id, ...doc.data() } as any));
      },
      error: (err) => {
        toast.error(err.message);
      },
    });
    () => unsubscribe();
  }, [id, dispatch]);
  if (!event) return <h2>Event not found</h2>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event} />
        <EventDetailInfo event={event} />
        <EventDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailSidebar />
      </Grid.Column>
    </Grid>
  );
}
