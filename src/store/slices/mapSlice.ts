import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api";
import { Map } from "../model/map";
import { RootState } from "../store";

const initialState: Map = {
  bancs: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const mapSlice = createSlice({
  name: "map",
  initialState: initialState as Map,
  reducers: {
    templateOne: (state, action: PayloadAction<Map>) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    /* RÉCUPÉRATION DES BANCS */
    builder.addCase(api.benches.get.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.benches.get.fulfilled, (state, { payload }) => {
      state.bancs = payload;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.benches.get.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });

    /* RÉCUPÉRATION DES BANCS */
    builder.addCase(api.benches.comment.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.benches.comment.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.benches.comment.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });
  },
});

export const mapSelector = (state: RootState): Map => state.map;

export const { templateOne } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
