import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api";
import { Template } from "../model/template";
import { RootState } from "../store";

const initialState: Template = {
  arg1: "",
  arg2: 0,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: ""
};

export const templateSlice = createSlice({
  name: "template",
  initialState: initialState as Template,
  reducers: {
    templateOne: (state, action: PayloadAction<Template>) => {
      return { ...state, ...action.payload };
    },
    templateTwo: (state, action: PayloadAction<Template>) => {
      return { 
        arg1: state.arg1,
        arg2: action.payload.arg2,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: ""
      };
    },
  },
  extraReducers: (builder) => {
    /* SUPPRESSION DE LA CARTE */
    builder.addCase(api.template.fetch.pending, (state) => {
      state.isFetching = true;
      return state;
    });
    builder.addCase(api.template.fetch.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    });
    builder.addCase(api.template.fetch.rejected, (state, { payload }: any) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.error;
    });
  }
});

export const templateSelector = (state: RootState): Template => state.template;

export const { templateOne, templateTwo } = templateSlice.actions;
export const templateReducer = templateSlice.reducer;
