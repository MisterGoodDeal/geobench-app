import {
  fetchBancs,
  fetchPostBench,
  fetchPostComment,
  fetchPostImage,
} from "./benches";
import { fetchCommunaute } from "./communaute";
import {
  fetchUserCheckAndChange,
  fetchUserDelete,
  fetchUserLogin,
  fetchUserRegister,
  fetchUserReset,
  fetchUserUpdateEmail,
  fetchUserUpdateFavorites,
  fetchUserUpdateFullname,
} from "./user";

export const api = {
  user: {
    login: fetchUserLogin,
    reset: fetchUserReset,
    checkAndChange: fetchUserCheckAndChange,
    register: fetchUserRegister,
    updateFullname: fetchUserUpdateFullname,
    updateEmail: fetchUserUpdateEmail,
    updateFavorites: fetchUserUpdateFavorites,
    delete: fetchUserDelete,
  },
  benches: {
    get: fetchBancs,
    comment: fetchPostComment,
    uploadImage: fetchPostImage,
    post: fetchPostBench,
  },
  communaute: {
    get: fetchCommunaute,
  },
};
