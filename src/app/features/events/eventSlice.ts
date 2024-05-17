import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Event } from "../../types/event";
import { Timestamp } from "firebase/firestore";
type State = {
  events: Event[];
};
const initialState: State = {
  events: [],
};
export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: {
      reducer: (state, action: PayloadAction<Event[]>) => {
        state.events = action.payload;
      },
      prepare: (events) => {
        const mapped = events.map((event: any) => {
          return {
            ...event,
            date: (event.date as Timestamp).toDate().toDateString(),
          };
        });
        return { payload: mapped };
      },
    },
    createEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action) => {
      state.events[
        state.events.findIndex((evt) => evt.id == action.payload.id)
      ] = action.payload;
    },
    deleteEvent: (state, action) => {
      state.events.splice(
        state.events.findIndex((evt) => evt.id == action.payload),
        1
      );
    },
  },
});
export const { createEvent, updateEvent, deleteEvent, setEvents } =
  eventSlice.actions;
