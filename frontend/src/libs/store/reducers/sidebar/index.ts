import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Sidebar {
  isExpand: boolean;
  menuExpand: Record<"dashboard" | "user", boolean>;
}

type MenuExpandPayload = {
  section: keyof Sidebar["menuExpand"];
  value: boolean;
};

const initialState: Sidebar = {
  isExpand: true,
  menuExpand: {
    dashboard: false,
    user: false,
  },
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setInitialState: (state) => {
      Object.assign(state, initialState);
    },
    toggleExpand: (state) => {
      state.isExpand = !state.isExpand;
    },
    setExpand: (state, action: PayloadAction<boolean>) => {
      state.isExpand = action.payload;
    },
    setMenuExpand: (state, action: PayloadAction<MenuExpandPayload>) => {
      const { section, value } = action.payload;
      state.menuExpand[section] = value;
    },
    toggleMenuExpand: (
      state,
      action: PayloadAction<keyof Sidebar["menuExpand"]>
    ) => {
      const section = action.payload;
      state.menuExpand[section] = !state.menuExpand[section];
    },
  },
});

export const {
  setInitialState,
  toggleExpand,
  setExpand,
  setMenuExpand,
  toggleMenuExpand,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
