import { createSlice, configureStore } from "@reduxjs/toolkit";

export type NavStateType = {
  nav: boolean;
};
export type LengthStateType = {
  eventsLength: number | null;
  memoLength: number | null;
};
export type userStateType = {
  user: string | null;
};

const initialState: NavStateType & LengthStateType & userStateType = {
  nav: false,
  eventsLength: null,
  memoLength: null,
  user: null,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    navOff: (state) => {
      state.nav = false;
    },
    navOn: (state) => {
      state.nav = true;
    },
    eventsLengthCheck: (state, action) => {
      state.eventsLength = action.payload;
    },
    memoLengthCheck: (state, action) => {
      state.memoLength = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: navSlice.reducer,
});

export const { navOff, navOn, eventsLengthCheck, memoLengthCheck } =
  navSlice.actions;
