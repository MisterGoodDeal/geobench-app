import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import { makeGetCommunauteApi, GetCommunauteApi } from "./benchesApi";
import { Fetch } from "../utils";

/* RÉCUPÉRER LES INFOS DE LA COMMUNAUTÉ */
interface GetCommunauteApiInterface {
  getCommunaute: GetCommunauteApi;
}

export const getGetCommunauteApi = (
  baseUrl: string
): GetCommunauteApiInterface => {
  const GetCommunauteFetch = getGetCommunauteFetch(fetch, baseUrl);

  return {
    getCommunaute: makeGetCommunauteApi(GetCommunauteFetch),
  };
};

const getGetCommunauteFetch = (fetch: Fetch, baseUrl: string): Fetch => {
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
