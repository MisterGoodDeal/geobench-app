import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppState = ReturnType<typeof store.getState>;
