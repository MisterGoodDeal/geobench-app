import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import { makeUserLoginApi, UserLoginApi } from "./userApi";
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
