import { Fetch } from "../utils";
import { localStorage } from "../../services/localStorage.service";

/* LOGIN USER */
interface ReturnUserLoginParams {
  login: string;
  password: string;
}
export interface UserLoginApi {
  return: (returnParams: ReturnUserLoginParams) => Promise<any>;
}

export const makeUserLoginApi = (fetchFn: Fetch): UserLoginApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/login`, {
      method: "POST",
      body: JSON.stringify({
        login: returnParams.login,
        password: returnParams.password,
      }),
    });
    return res;
  },
});
