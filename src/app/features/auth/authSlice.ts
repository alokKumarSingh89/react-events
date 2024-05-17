import { createSlice } from "@reduxjs/toolkit";

interface IState {
  authenticated: boolean;
  currentUser: any;
}

const initialState: IState = {
  authenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.authenticated = true;
      state.currentUser = {
        email: action.payload.email,
        photoURL: "/user.png",
      };
    },
    signOut: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});
