import { RequestInit, Response } from "node-fetch";
import { Lang } from "../constants/Lang";

export type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

export const getLoginErrorMsg = (error_code: string) => {
  switch (error_code) {
    case "unknown_user":
      return Lang.errors.unknown_user;
    case "wrong_password":
      return Lang.errors.wrong_credential;
    default:
      return Lang.errors.internal_error;
  }
};
export const getPasswordResetErrorMsg = (error_code: string) => {
  switch (error_code) {
    case "wrong_otp":
      return Lang.forgotPassword.checkAndChange.error;
    default:
      return Lang.errors.internal_error;
  }
};
export const getRegisterErrorMsg = (error_code: string) => {
  switch (error_code) {
    case "already_exists_both":
      return Lang.register.messages.error.both;
    case "already_exists_mail":
      return Lang.register.messages.error.email;
    case "already_exists_username":
      return Lang.register.messages.error.user;
    default:
      return Lang.errors.internal_error;
  }
};
