import { Fetch } from "../utils";
import { localStorage } from "../../services/localStorage.service";
import { UserLocal } from "../../utils/interface";
import { env } from "../../utils/env";
const FormData = require("form-data");

/* RÉCUPÉRER LES INFOS DE LA COMMUNAUTÉ */
export interface GetCommunauteApi {
  return: () => Promise<any>;
}

export const makeGetCommunauteApi = (fetchFn: Fetch): GetCommunauteApi => ({
  return: async () => {
    const user = await localStorage.get("user");
    const u: UserLocal = JSON.parse(user);
    const res = await fetchFn(`community`, {
      method: "GET",
      headers: {
        "x-auth": `${u.id}`,
      },
    });
    return res;
  },
});
