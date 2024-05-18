import { PayloadAction } from "@reduxjs/toolkit";
import { GenericState, createGenericSlice } from "../../store/genericSlice";
import { Profile } from "../../types/profile";
import { Timestamp } from "firebase/firestore";

type State = {
  data: Profile[];
};

const initialState: State = {
  data: [],
};

export const profileSlice = createGenericSlice({
  name: "profiles",
  initialState: initialState as GenericState<Profile[]>,
  reducers: {
    success: {
      reducer: (state, action: PayloadAction<Profile[]>) => {
        state.data = action.payload;
        state.status = "finished";
      },
      prepare: (profile) => {
        let profileArray: Profile[] = [];
        Array.isArray(profile)
          ? (profileArray = profile)
          : profileArray.push(profile);
        const payload = profileArray.map((profile) => {
          return {
            ...profile,
            createAt: (profile.createAt as unknown as Timestamp)
              .toDate()
              .toISOString(),
          };
        });

        return { payload };
      },
    },
  },
});
export const actions = profileSlice.actions;
