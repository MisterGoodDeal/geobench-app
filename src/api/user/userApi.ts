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

/* RESET PASSWORD */
interface ReturnUserResetParams {
  lang: string;
  email: string;
}
export interface UserResetApi {
  return: (returnParams: ReturnUserResetParams) => Promise<any>;
}

export const makeUserResetApi = (fetchFn: Fetch): UserResetApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/reset`, {
      method: "POST",
      body: JSON.stringify({
        lang: returnParams.lang,
        email: returnParams.email,
      }),
    });
    return res;
  },
});

/* CHECK OTP AND MODIFY PASSWORD */
interface ReturnUserCheckAndChangeParams {
  code: string;
  email: string;
  password: string;
}
export interface UserCheckAndChangeApi {
  return: (returnParams: ReturnUserCheckAndChangeParams) => Promise<any>;
}

export const makeUserCheckAndChangeApi = (
  fetchFn: Fetch
): UserCheckAndChangeApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/updatePassword`, {
      method: "PUT",
      body: JSON.stringify({
        code: returnParams.code,
        email: returnParams.email,
        password: returnParams.password,
      }),
    });
    return res;
  },
});

/* REGISTER USER */
interface ReturnUserRegisterParams {
  prenom: string;
  nom: string;
  username: string;
  email: string;
  password: string;
}
export interface UserRegisterApi {
  return: (returnParams: ReturnUserRegisterParams) => Promise<any>;
}

export const makeUserRegisterApi = (fetchFn: Fetch): UserRegisterApi => ({
  return: async (returnParams) => {
    const res = await fetchFn(`user/register`, {
      method: "POST",
      body: JSON.stringify({
        prenom: returnParams.prenom,
        nom: returnParams.nom,
        username: returnParams.username,
        email: returnParams.email,
        password: returnParams.password,
      }),
    });
    return res;
  },
});
