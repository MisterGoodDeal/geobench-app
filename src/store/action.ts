import { mapSlice } from "./slices/mapSlice";
import { userSlice } from "./slices/userSlice";

export const actions = {
  [userSlice.name]: userSlice.actions,
  [mapSlice.name]: mapSlice.actions,
};
