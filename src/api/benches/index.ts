/* eslint-disable no-console */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { env } from "../../utils/env";
import { getGetBancsApi, postCommentApi } from "./api";

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
