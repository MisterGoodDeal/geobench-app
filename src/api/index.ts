import {
  fetchBancs,
  fetchPostBench,
  fetchPostComment,
  fetchPostImage,
} from "./benches";
import { fetchTemplate } from "./template";
import {
  fetchUserCheckAndChange,
  fetchUserLogin,
  fetchUserRegister,
  fetchUserReset,
} from "./user";

export const api = {
  template: {
    fetch: fetchTemplate,
  },
  user: {
    login: fetchUserLogin,
    reset: fetchUserReset,
    checkAndChange: fetchUserCheckAndChange,
    register: fetchUserRegister,
  },
  benches: {
    get: fetchBancs,
    comment: fetchPostComment,
    uploadImage: fetchPostImage,
    post: fetchPostBench,
  },
};
