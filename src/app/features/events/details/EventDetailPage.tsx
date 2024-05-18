import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailChat from "./EventDetailChat";
import EventDetailSidebar from "./EventDetailSidebar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../store/store";

import { actions } from "../eventSlice";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import LoadingComponent from "../../../layouts/LoadingComponent";

export default function EventDetail() {
  const { id } = useParams();
  const event = useAppSelector((store) =>
    store.events.data.find((evt) => evt.id === id)
  );
  const { status } = useAppSelector((state) => state.events);

  const { loadDocument } = useFirestore("events");
  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  if (status == "loading") <LoadingComponent />;
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
