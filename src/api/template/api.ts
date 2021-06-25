import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import { makeTemplateApi, TemplateApi } from "./templateApi";
import { Fetch } from "../utils";

interface TemplateApiInterface {
  template: TemplateApi;
}

export const getTemplateApi = (
  baseUrl: string
): TemplateApiInterface => {
  const TemplateFetch = getTemplateFetch(fetch, baseUrl);

  return {
    template: makeTemplateApi(TemplateFetch),
  };
};

const getTemplateFetch = (fetch: Fetch, baseUrl: string): Fetch => {
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
