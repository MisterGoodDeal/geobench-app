/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { localStorage } from "../../services/localStorage.service";
import { getTemplateApi } from "./api";

const templateApi = getTemplateApi("https://google.fr");

interface Parameters {
  arg1: string
}

export const fetchTemplate = createAsyncThunk(
  "template",
  async ({arg1}: Parameters, thunkAPI) => {
    try {
      const res = await templateApi.template.return({arg1: arg1});
      const transactionData = /*await res.json();*/ "Gud";
      if (res.ok) {
        return transactionData;
      } else {
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
