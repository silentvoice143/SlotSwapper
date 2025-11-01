// import { useDispatch, useSelector } from "react-redux";
// import type { TypedUseSelectorHook } from "react-redux";
// import type { AppDispatch, RootState } from "../store";

// // Typed versions of useDispatch and useSelector
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppStore = () => {
//   const dispatch = useAppDispatch();
//   const state = useAppSelector((state) => state);
//   return { dispatch, state };
// };

import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import type { Store } from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppStore = useStore as unknown as () => Store<RootState>;
