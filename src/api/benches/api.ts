import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import {
  makeGetBancsApi,
  GetBancsApi,
  PostCommentApi,
  makePostCommentApi,
} from "./benchesApi";
import { Fetch } from "../utils";

/* RÉCUPÉRER LES BANCS */
interface GetBancsApiInterface {
  getBancs: GetBancsApi;
}

export const getGetBancsApi = (baseUrl: string): GetBancsApiInterface => {
  const GetBancsFetch = getGetBancsFetch(fetch, baseUrl);

  return {
    getBancs: makeGetBancsApi(GetBancsFetch),
  };
};

const getGetBancsFetch = (fetch: Fetch, baseUrl: string): Fetch => {
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

/* POSTER UN COMMENTAIRE */
interface PostCommentApiInterface {
  postComment: PostCommentApi;
}

export const postCommentApi = (baseUrl: string): PostCommentApiInterface => {
  const PostCommentFetch = getPostCommentFetch(fetch, baseUrl);

  return {
    postComment: makePostCommentApi(PostCommentFetch),
  };
};

const getPostCommentFetch = (fetch: Fetch, baseUrl: string): Fetch => {
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
