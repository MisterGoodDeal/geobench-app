/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { localStorage } from "../../services/localStorage.service";
import { env } from "../../utils/env";
import { getUserLoginApi } from "./api";

/* USER LOGIN */
const userLoginApi = getUserLoginApi(env.apiUrl);

interface Parameters {
  login: string;
  password: string;
}

export const fetchUserLogin = createAsyncThunk(
  "user/login",
  async ({ login, password }: Parameters, thunkAPI) => {
    try {
      const res = await userLoginApi.login.return({
        login: login,
        password: password,
      });

      const userData = await res.json();
      if (res.ok) {
        await localStorage.store("user", JSON.stringify(userData));
        return userData;
      } else {
        return thunkAPI.rejectWithValue(userData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
