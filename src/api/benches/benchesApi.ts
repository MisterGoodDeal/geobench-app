import { Fetch } from "../utils";
import { localStorage } from "../../services/localStorage.service";
import { UserLocal } from "../../utils/interface";
import { env } from "../../utils/env";
const FormData = require("form-data");

/* RÉCUPÉRER LES BANCS */
export interface GetBancsApi {
  return: () => Promise<any>;
}

export const makeGetBancsApi = (fetchFn: Fetch): GetBancsApi => ({
  return: async () => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`bancs`, {
      method: "GET",
      headers: {
        "x-auth": `${u.id}`,
      },
    });
    return res;
  },
});

/* AJOUTER UN COMMENTAIRE */
interface ReturnPostCommentParam {
  username: string;
  banc: number;
  commentaire: string;
}

export interface PostCommentApi {
  return: (returnParams: ReturnPostCommentParam) => Promise<any>;
}

export const makePostCommentApi = (fetchFn: Fetch): PostCommentApi => ({
  return: async (returnParams) => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`banc/commentaire`, {
      method: "PUT",
      headers: {
        "x-auth": `${u.id}`,
      },
      body: JSON.stringify({
        username: returnParams.username,
        banc: returnParams.banc,
        commentaire: returnParams.commentaire,
      }),
    });
    return res;
  },
});

/* API IMGBB */
interface ReturnPostImageParam {
  image: string;
}

export interface PostImageApi {
  return: (returnParams: ReturnPostImageParam) => Promise<any>;
}

export const makePostImageApi = (fetchFn: Fetch): PostImageApi => ({
  return: async (returnParams) => {
    const form = new FormData();
    form.append("image", returnParams.image);

    const res = await fetchFn(`1/upload?expiration=0&key=${env.imgBB.key}`, {
      method: "POST",
      body: form,
    });
    return res;
  },
});

/* AJOUTER UN NOUVEAU BANC */
interface ReturnPostBenchParam {
  longitude: number;
  latitude: number;
  note: number;
  lieu: string;
  environnement: string;
  commetaire: string;
  nom_photo: string;
}

export interface PostBenchApi {
  return: (returnParams: ReturnPostBenchParam) => Promise<any>;
}

export const makePostBenchApi = (fetchFn: Fetch): PostBenchApi => ({
  return: async (returnParams) => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`bancs`, {
      method: "POST",
      headers: {
        "x-auth": `${u.id}`,
      },
      body: JSON.stringify({
        longitude: returnParams.longitude,
        latitude: returnParams.latitude,
        note: returnParams.note,
        lieu: returnParams.lieu,
        environnement: returnParams.environnement,
        user: u.pseudo,
        commetaire: returnParams.commetaire,
        nom_photo: returnParams.nom_photo,
      }),
    });
    return res;
  },
});
