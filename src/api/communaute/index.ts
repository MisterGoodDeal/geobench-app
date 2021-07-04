/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../utils/env";
import { getGetCommunauteApi } from "./api";

/* RÉCUPÉRER LES INFOS DE LA COMMUNAUTÉ */
const getCommunauteApi = getGetCommunauteApi(env.apiUrl);

interface GetCommunauteParameters {}

export const fetchCommunaute = createAsyncThunk(
  "getCommunaute",
  async ({}: GetCommunauteParameters, thunkAPI) => {
    try {
      const res = await getCommunauteApi.getCommunaute.return();
      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
