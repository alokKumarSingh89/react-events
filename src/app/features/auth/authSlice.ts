import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EventUser } from "../../types/user";
import { User } from "firebase/auth";

interface IState {
  authenticated: boolean;
  currentUser: EventUser | null;
}

const initialState: IState = {
  authenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: {
      reducer: (state, action: PayloadAction<EventUser>) => {
        state.authenticated = true;
        state.currentUser = action.payload;
      },
      prepare: (user: User) => {
        const payload: EventUser = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          providerId: user.providerData[0].providerId,
        };
        return { payload };
      },
    },
    logOut: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});
export const { signIn, logOut } = authSlice.actions;
