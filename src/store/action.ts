import { templateSlice } from "./slices/templateSlice";
import { userSlice } from "./slices/userSlice";

export const actions = {
  [templateSlice.name]: templateSlice.actions,
  [userSlice.name]: userSlice.actions,
};
