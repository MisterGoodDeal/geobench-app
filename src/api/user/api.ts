import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import {
  makeUserCheckAndChangeApi,
  makeUserLoginApi,
  makeUserResetApi,
  UserCheckAndChangeApi,
  UserLoginApi,
  UserResetApi,
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
