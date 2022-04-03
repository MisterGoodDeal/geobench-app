import { Fetch } from "../utils";
import { localStorage } from "../../services/localStorage.service";
import { UserLocal } from "../../utils/interface";
import { Platform } from "react-native";

/* LOGIN USER */
interface ReturnUserLoginParams {
  login: string;
  password: string;
}
export interface UserLoginApi {
  return: (returnParams: ReturnUserLoginParams) => Promise<any>;
}

export const makeUserLoginApi = (fetchFn: Fetch): UserLoginApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/login`, {
      method: "POST",
      body: JSON.stringify({
        login: returnParams.login,
        password: returnParams.password,
        platform: Platform.OS,
      }),
    });
    return res;
  },
});

/* RESET PASSWORD */
interface ReturnUserResetParams {
  lang: string;
  email: string;
}
export interface UserResetApi {
  return: (returnParams: ReturnUserResetParams) => Promise<any>;
}

export const makeUserResetApi = (fetchFn: Fetch): UserResetApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/reset`, {
      method: "POST",
      body: JSON.stringify({
        lang: returnParams.lang,
        email: returnParams.email,
      }),
    });
    return res;
  },
});

/* CHECK OTP AND MODIFY PASSWORD */
interface ReturnUserCheckAndChangeParams {
  code: string;
  email: string;
  password: string;
}
export interface UserCheckAndChangeApi {
  return: (returnParams: ReturnUserCheckAndChangeParams) => Promise<any>;
}

export const makeUserCheckAndChangeApi = (
  fetchFn: Fetch
): UserCheckAndChangeApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/updatePassword`, {
      method: "PUT",
      body: JSON.stringify({
        code: returnParams.code,
        email: returnParams.email,
        password: returnParams.password,
      }),
    });
    return res;
  },
});

/* REGISTER USER */
interface ReturnUserRegisterParams {
  prenom: string;
  nom: string;
  username: string;
  email: string;
  password: string;
}
export interface UserRegisterApi {
  return: (returnParams: ReturnUserRegisterParams) => Promise<any>;
}

export const makeUserRegisterApi = (fetchFn: Fetch): UserRegisterApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/register`, {
      method: "POST",
      body: JSON.stringify({
        prenom: returnParams.prenom,
        nom: returnParams.nom,
        username: returnParams.username,
        email: returnParams.email,
        password: returnParams.password,
      }),
    });
    return res;
  },
});

/* UPDATE FULLNAME */
interface ReturnUserUpdateFullnameParams {
  firstname: string;
  lastname: string;
}
export interface UserUpdateFullnameApi {
  return: (returnParams: ReturnUserUpdateFullnameParams) => Promise<any>;
}

export const makeUserUpdateFullnameApi = (
  fetchFn: Fetch
): UserUpdateFullnameApi => ({
  return: async (returnParams) => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`user/fullname`, {
      method: "PUT",
      headers: {
        "x-auth": `${u.id}`,
      },
      body: JSON.stringify({
        firstname: returnParams.firstname,
        lastname: returnParams.lastname,
      }),
    });
    return res;
  },
});

/* UPDATE EMAIL */
interface ReturnUserUpdateEmailParams {
  email: string;
}
export interface UserUpdateEmailApi {
  return: (returnParams: ReturnUserUpdateEmailParams) => Promise<any>;
}

export const makeUserUpdateEmailApi = (fetchFn: Fetch): UserUpdateEmailApi => ({
  return: async (returnParams) => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`user/email`, {
      method: "PUT",
      headers: {
        "x-auth": `${u.id}`,
      },
      body: JSON.stringify({
        email: returnParams.email,
      }),
    });
    return res;
  },
});

/* UPDATE FAVORITES */
interface ReturnUserUpdateFavoritesParams {
  favoris: string;
}
export interface UserUpdateFavoritesApi {
  return: (returnParams: ReturnUserUpdateFavoritesParams) => Promise<any>;
}

export const makeUserUpdateFavoritesApi = (
  fetchFn: Fetch
): UserUpdateFavoritesApi => ({
  return: async (returnParams) => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`user/favoris`, {
      method: "PUT",
      headers: {
        "x-auth": `${u.id}`,
      },
      body: JSON.stringify({
        favoris: returnParams.favoris,
      }),
    });
    return res;
  },
});

/* DELETE ACCOUNT */
export interface UserDeleteApi {
  return: () => Promise<any>;
}

export const makeUserDeleteApi = (fetchFn: Fetch): UserDeleteApi => ({
  return: async () => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`user/delete`, {
      method: "POST",
      headers: {
        "x-auth": `${u.id}`,
      },
    });
    return res;
  },
});
