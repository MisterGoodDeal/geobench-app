import { Fetch } from "../utils";
import { localStorage } from "../../services/localStorage.service";
import { UserLocal } from "../../utils/interface";

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
