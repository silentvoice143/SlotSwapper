import { createSlice } from "@reduxjs/toolkit";

export interface Auth {
  userId: string | null;
  email: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: Auth = {
  userId: null,
  email: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialState: (state) => {
      Object.assign(state, initialState);
    },
    setAuthState: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setInitialState, setAuthState, logoutUser } = authSlice.actions;

export default authSlice.reducer;
