/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { localStorage } from "../../services/localStorage.service";
import { env } from "../../utils/env";
import {
  getUserCheckAndChangeApi,
  getUserLoginApi,
  getUserRegisterApi,
  getUserResetApi,
  getUserUpdateEmailApi,
  getUserUpdateFullnameApi,
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

/* REGISTER USER */
const userRegisterApi = getUserRegisterApi(env.apiUrl);

interface ParametersRegister {
  prenom: string;
  nom: string;
  username: string;
  email: string;
  password: string;
}

export const fetchUserRegister = createAsyncThunk(
  "user/register",
  async (
    { prenom, nom, username, email, password }: ParametersRegister,
    thunkAPI
  ) => {
    try {
      const res = await userRegisterApi.register.return({
        prenom: prenom,
        nom: nom,
        username: username,
        email: email,
        password,
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

/* UPDATE FULLNAME */
const userUpdateFullnameApi = getUserUpdateFullnameApi(env.apiUrl);

interface ParametersUpdateFullname {
  firstname: string;
  lastname: string;
}

export const fetchUserUpdateFullname = createAsyncThunk(
  "user/updateFullname",
  async ({ firstname, lastname }: ParametersUpdateFullname, thunkAPI) => {
    try {
      const res = await userUpdateFullnameApi.updateFullname.return({
        firstname: firstname,
        lastname: lastname,
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

/* UPDATE EMAIL */
const userUpdateEmailApi = getUserUpdateEmailApi(env.apiUrl);

interface ParametersUpdateEmail {
  email: string;
}

export const fetchUserUpdateEmail = createAsyncThunk(
  "user/updateEmail",
  async ({ email }: ParametersUpdateEmail, thunkAPI) => {
    try {
      const res = await userUpdateEmailApi.updateEmail.return({
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
