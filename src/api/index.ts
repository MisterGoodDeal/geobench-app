import {
  fetchBancs,
  fetchPostBench,
  fetchPostComment,
  fetchPostImage,
} from "./benches";
import {
  fetchUserCheckAndChange,
  fetchUserLogin,
  fetchUserRegister,
  fetchUserReset,
  fetchUserUpdateEmail,
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
  },
  benches: {
    get: fetchBancs,
    comment: fetchPostComment,
    uploadImage: fetchPostImage,
    post: fetchPostBench,
  },
};
