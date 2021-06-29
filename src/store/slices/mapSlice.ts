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
  isUploaded: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState: initialState as Map,
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
    clearImage: (state) => {
      state.imageURL = undefined;
    },
    clearUpload: (state) => {
      state.isUploaded = false;
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

    /* RÉCUPÉRATION DE L'URL DE L'IMAGE DE IMGBB */
    builder.addCase(api.benches.uploadImage.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.benches.uploadImage.fulfilled, (state, { payload }) => {
      console.log("IMG PAYLOAD => ", payload);
      state.imageURL = payload.data.display_url;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(
      api.benches.uploadImage.rejected,
      (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.errorMessage = payload;
      }
    );

    /* AJOUT D'UN BANC EN BASE DE DONNÉE */
    builder.addCase(api.benches.post.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.benches.post.fulfilled, (state, { payload }) => {
      state.isUploaded = true;
      state.imageURL = undefined;
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.benches.post.rejected, (state, { payload }: any) => {
      state.isUploaded = true;
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    });
  },
});

export const mapSelector = (state: RootState): Map => state.map;

export const { clearState } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
