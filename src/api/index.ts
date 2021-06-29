import {
  fetchBancs,
  fetchPostBench,
  fetchPostComment,
  fetchPostImage,
} from "./benches";
import { fetchTemplate } from "./template";
import { fetchUserLogin } from "./user";

export const api = {
  template: {
    fetch: fetchTemplate,
  },
  user: {
    login: fetchUserLogin,
  },
  benches: {
    get: fetchBancs,
    comment: fetchPostComment,
    uploadImage: fetchPostImage,
    post: fetchPostBench,
  },
};
