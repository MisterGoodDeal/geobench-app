/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../utils/env";
import {
  getGetBancsApi,
  postBenchApi,
  postCommentApi,
  postImageApi,
} from "./api";

/* RÉCUPÉRER LES BANCS */
const getBancsApi = getGetBancsApi(env.apiUrl);

interface GetBancsParameters {}

export const fetchBancs = createAsyncThunk(
  "getBenches",
  async ({}: GetBancsParameters, thunkAPI) => {
    try {
      const res = await getBancsApi.getBancs.return();
      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

/* POSTER UN COMMENTAIRE */
const postComment = postCommentApi(env.apiUrl);

interface PostCommentBenchParameters {
  username: string;
  banc: number;
  commentaire: string;
}

export const fetchPostComment = createAsyncThunk(
  "postComment",
  async (
    { username, banc, commentaire }: PostCommentBenchParameters,
    thunkAPI
  ) => {
    try {
      const res = await postComment.postComment.return({
        commentaire: commentaire,
        banc: banc,
        username: username,
      });
      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        return thunkAPI.rejectWithValue(res);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

/* POSTER UNE IMAGE */
const postImage = postImageApi(env.imgBB.url);

interface PostImageBenchParameters {
  image: string;
}

export const fetchPostImage = createAsyncThunk(
  "postImage",
  async ({ image }: PostImageBenchParameters, thunkAPI) => {
    try {
      const res = await postImage.postImage.return({
        image: image,
      });
      console.log("RES => ", res);

      const json = await res.json();
      if (res.ok) {
        return json;
      } else {
        return thunkAPI.rejectWithValue(json);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

/* POSTER UNE NOUVEAU BANC */
const postBench = postBenchApi(env.apiUrl);

interface PostBenchBenchParameters {
  longitude: number;
  latitude: number;
  note: number;
  lieu: string;
  environnement: string;
  commetaire: string;
  nom_photo: string;
}

export const fetchPostBench = createAsyncThunk(
  "postBench",
  async (
    {
      longitude,
      latitude,
      note,
      lieu,
      environnement,
      commetaire,
      nom_photo,
    }: PostBenchBenchParameters,
    thunkAPI
  ) => {
    try {
      const res = await postBench.postBench.return({
        longitude: longitude,
        latitude: latitude,
        note: note,
        lieu: lieu,
        environnement: environnement,
        commetaire: commetaire,
        nom_photo: nom_photo,
      });

      const json = await res.json();
      console.log("RES => ", json);
      if (res.ok) {
        return json;
      } else {
        return thunkAPI.rejectWithValue(json);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);
