/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { localStorage } from "../../services/localStorage.service";
import { env } from "../../utils/env";
import {
  getUserCheckAndChangeApi,
  getUserLoginApi,
  getUserResetApi,
} from "./api";

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

/* PASSWORD RESET */
const userResetApi = getUserResetApi(env.apiUrl);

interface ParametersReset {
  lang: string;
  email: string;
}

export const fetchUserReset = createAsyncThunk(
  "user/reset",
  async ({ lang, email }: ParametersReset, thunkAPI) => {
    try {
      const res = await userResetApi.reset.return({
        lang: lang,
        email: email,
      });

      const userData = await res.json();
      if (res.ok) {
        return userData;
      } else {
        return thunkAPI.rejectWithValue(userData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

/* CHECK OTP AND MODIFY PASSWORD */
const userCheckAndChangeApi = getUserCheckAndChangeApi(env.apiUrl);

interface ParametersCheckAndChange {
  code: string;
  email: string;
  password: string;
}

export const fetchUserCheckAndChange = createAsyncThunk(
  "user/checkAndChange",
  async ({ code, email, password }: ParametersCheckAndChange, thunkAPI) => {
    try {
      const res = await userCheckAndChangeApi.checkAndChange.return({
        code: code,
        email: email,
        password: password,
      });

      const userData = await res.json();
      if (res.ok) {
        return userData;
      } else {
        return thunkAPI.rejectWithValue(userData);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
