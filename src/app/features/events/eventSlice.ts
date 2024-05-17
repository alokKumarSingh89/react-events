import { PayloadAction } from "@reduxjs/toolkit";
import { Event } from "../../types/event";
import { Timestamp } from "firebase/firestore";
import {
  GenericAction,
  GenericState,
  createGenericSlice,
} from "../../store/genericSlice";
type State = {
  data: Event[];
};
const initialState: State = {
  data: [],
};
export const eventSlice = createGenericSlice({
  name: "events",
  initialState: initialState as GenericState<Event[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<Event[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      prepare: (events) => {
        let arr: Event[] = [];
        Array.isArray(events) ? (arr = events) : arr.push(events);
        const mapped = arr.map((event: any) => {
          return {
            ...event,
            date: (event.date as Timestamp).toDate().toDateString(),
          };
        });
        return { payload: mapped };
      },
    },
  },
});
export const actions = eventSlice.actions as GenericAction<Event[]>;
