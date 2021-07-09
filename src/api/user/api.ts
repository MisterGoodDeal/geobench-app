import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import {
  makeUserCheckAndChangeApi,
  makeUserDeleteApi,
  makeUserLoginApi,
  makeUserRegisterApi,
  makeUserResetApi,
  makeUserUpdateEmailApi,
  makeUserUpdateFavoritesApi,
  makeUserUpdateFullnameApi,
  UserCheckAndChangeApi,
  UserDeleteApi,
  UserLoginApi,
  UserRegisterApi,
  UserResetApi,
  UserUpdateEmailApi,
  UserUpdateFavoritesApi,
  UserUpdateFullnameApi,
} from "./userApi";
import { Fetch } from "../utils";

/* USER LOGIN */
interface UserLoginApiInterface {
  login: UserLoginApi;
}

export const getUserLoginApi = (baseUrl: string): UserLoginApiInterface => {
  const UserLoginFetch = getUserLoginFetch(fetch, baseUrl);

  return {
    login: makeUserLoginApi(UserLoginFetch),
  };
};

const getUserLoginFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* PASSWORD RESET */
interface UserResetApiInterface {
  reset: UserResetApi;
}

export const getUserResetApi = (baseUrl: string): UserResetApiInterface => {
  const UserResetFetch = getUserResetFetch(fetch, baseUrl);

  return {
    reset: makeUserResetApi(UserResetFetch),
  };
};

const getUserResetFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* CHECK OTP AND MODIFY PASSWORD */
interface UserCheckAndChangeApiInterface {
  checkAndChange: UserCheckAndChangeApi;
}

export const getUserCheckAndChangeApi = (
  baseUrl: string
): UserCheckAndChangeApiInterface => {
  const UserCheckAndChangeFetch = getUserCheckAndChangeFetch(fetch, baseUrl);

  return {
    checkAndChange: makeUserCheckAndChangeApi(UserCheckAndChangeFetch),
  };
};

const getUserCheckAndChangeFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* REGISTER USER */
interface UserRegisterApiInterface {
  register: UserRegisterApi;
}

export const getUserRegisterApi = (
  baseUrl: string
): UserRegisterApiInterface => {
  const UserRegisterFetch = getUserRegisterFetch(fetch, baseUrl);

  return {
    register: makeUserRegisterApi(UserRegisterFetch),
  };
};

const getUserRegisterFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* UPDATE FULLNAME */
interface UserUpdateFullnameApiInterface {
  updateFullname: UserUpdateFullnameApi;
}

export const getUserUpdateFullnameApi = (
  baseUrl: string
): UserUpdateFullnameApiInterface => {
  const UserUpdateFullnameFetch = getUserUpdateFullnameFetch(fetch, baseUrl);

  return {
    updateFullname: makeUserUpdateFullnameApi(UserUpdateFullnameFetch),
  };
};

const getUserUpdateFullnameFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* UPDATE EMAIL */
interface UserUpdateEmailApiInterface {
  updateEmail: UserUpdateEmailApi;
}

export const getUserUpdateEmailApi = (
  baseUrl: string
): UserUpdateEmailApiInterface => {
  const UserUpdateEmailFetch = getUserUpdateEmailFetch(fetch, baseUrl);

  return {
    updateEmail: makeUserUpdateEmailApi(UserUpdateEmailFetch),
  };
};

const getUserUpdateEmailFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* UPDATE FAVORITES */
interface UserUpdateFavoritesApiInterface {
  updateFavorites: UserUpdateFavoritesApi;
}

export const getUserUpdateFavoritesApi = (
  baseUrl: string
): UserUpdateFavoritesApiInterface => {
  const UserUpdateFavoritesFetch = getUserUpdateFavoritesFetch(fetch, baseUrl);

  return {
    updateFavorites: makeUserUpdateFavoritesApi(UserUpdateFavoritesFetch),
  };
};

const getUserUpdateFavoritesFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};

/* DELETE ACCOUNT */
interface UserDeleteApiInterface {
  delete: UserDeleteApi;
}

export const getUserDeleteApi = (baseUrl: string): UserDeleteApiInterface => {
  const UserDeleteFetch = getUserDeleteFetch(fetch, baseUrl);

  return {
    delete: makeUserDeleteApi(UserDeleteFetch),
  };
};

const getUserDeleteFetch = (fetch: Fetch, baseUrl: string): Fetch => {
  return async (input: RequestInfo, init?: RequestInit) => {
    const routeUrl =
      typeof input === "string"
        ? input
        : hasOwnProperty(input, "href")
        ? input.href
        : input.url;

    const requestInit: RequestInit = {
      ...init,
      headers: {
        ...init?.headers,
        "Content-Type": "application/json",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;

    const res = await fetch(url, requestInit);
    return res;
  };
};
