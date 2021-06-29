import fetch, { RequestInfo, RequestInit } from "node-fetch";
import { hasOwnProperty } from "../asserts";
import {
  makeGetBancsApi,
  GetBancsApi,
  PostCommentApi,
  makePostCommentApi,
  PostImageApi,
  makePostImageApi,
  makePostBenchApi,
  PostBenchApi,
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

/* POSTER UNE IMAGE */
interface PostImageApiInterface {
  postImage: PostImageApi;
}

export const postImageApi = (baseUrl: string): PostImageApiInterface => {
  const PostImageFetch = getPostImageFetch(fetch, baseUrl);

  return {
    postImage: makePostImageApi(PostImageFetch),
  };
};

const getPostImageFetch = (fetch: Fetch, baseUrl: string): Fetch => {
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
        "Content-Type": "multipart/form-data",
      },
    };

    const url = `${baseUrl}/${routeUrl}`;
    console.log("URL => ", url);
    console.log("REQUEST INIT => ", requestInit);

    const res = await fetch(url, requestInit);

    return res;
  };
};

/* POSTER UN NOUVEAU BANC */
interface PostBenchApiInterface {
  postBench: PostBenchApi;
}

export const postBenchApi = (baseUrl: string): PostBenchApiInterface => {
  const PostBenchFetch = getPostBenchFetch(fetch, baseUrl);

  return {
    postBench: makePostBenchApi(PostBenchFetch),
  };
};

const getPostBenchFetch = (fetch: Fetch, baseUrl: string): Fetch => {
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
    console.log("URL => ", url);
    console.log("REQUEST INIT => ", requestInit);

    const res = await fetch(url, requestInit);

    return res;
  };
};
